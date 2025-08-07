import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import listingPageData from '../../json/listingPageData.json';

// Async thunk for fetching product listing data
// In a real application, this would fetch from an API
// For now, we'll use the local JSON file
export const fetchProductListingData = createAsyncThunk(
  'listing/fetchProductListingData',
  async () => {
    // Simulate API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(listingPageData);
      }, 300);
    });
  }
);

const initialState = {
  products: [],
  filteredProducts: [],
  activeFilters: {
    category: 'all',
    sortBy: 'popularity',
    priceRange: [0, 1000],
  },
  viewType: 'grid',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    // Action to set view type (grid or list)
    setViewType: (state, action) => {
      state.viewType = action.payload;
    },
    
    // Action to set active category filter
    setCategoryFilter: (state, action) => {
      state.activeFilters.category = action.payload;
      state.filteredProducts = filterProducts(state.products, {
        ...state.activeFilters,
        category: action.payload,
      });
    },
    
    // Action to set sort by filter
    setSortByFilter: (state, action) => {
      state.activeFilters.sortBy = action.payload;
      state.filteredProducts = sortProducts(state.filteredProducts, action.payload);
    },
    
    // Action to set price range filter
    setPriceRangeFilter: (state, action) => {
      state.activeFilters.priceRange = action.payload;
      state.filteredProducts = filterProducts(state.products, {
        ...state.activeFilters,
        priceRange: action.payload,
      });
    },
    
    // Reset all filters
    resetFilters: (state) => {
      state.activeFilters = {
        category: 'all',
        sortBy: 'popularity',
        priceRange: [0, 1000],
      };
      state.filteredProducts = [...state.products];
      state.filteredProducts = sortProducts(state.filteredProducts, 'popularity');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductListingData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductListingData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update products with fetched data
        state.products = action.payload;
        // Apply initial filtering and sorting
        state.filteredProducts = [...action.payload];
        state.filteredProducts = sortProducts(state.filteredProducts, state.activeFilters.sortBy);
        state.error = null;
      })
      .addCase(fetchProductListingData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product data';
      });
  }
});

// Helper function to filter products based on criteria
const filterProducts = (products, filters) => {
  return products.filter(product => {
    // Filter by category
    const categoryMatch = filters.category === 'all' || 
      (product.categories && product.categories.includes(filters.category));
    
    // Filter by price range
    const priceMatch = product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1];
    
    return categoryMatch && priceMatch;
  });
};

// Helper function to sort products
const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case 'popularity':
    default:
      // For "popularity" sort, we could use a popularity field if available
      // For now, we'll just return the products in their original order
      return sortedProducts;
  }
};

// Export actions
export const { 
  setViewType, 
  setCategoryFilter, 
  setSortByFilter, 
  setPriceRangeFilter,
  resetFilters 
} = listingSlice.actions;

export default listingSlice.reducer;
