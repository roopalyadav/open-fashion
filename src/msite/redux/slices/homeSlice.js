import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCarouselData, getNewArrivalData, getBrandsData } from '../../api/homePageApi';

// Async thunk for fetching carousel data
export const fetchCarouselData = createAsyncThunk(
  'home/fetchCarouselData',
  async () => {
    const carouselData = await getCarouselData();
    return carouselData;
  }
);

// Async thunk for fetching new arrival data
export const fetchNewArrivalData = createAsyncThunk(
  'home/fetchNewArrivalData',
  async () => {
    const newArrivalData = await getNewArrivalData();
    return newArrivalData;
  }
);

// Async thunk for fetching brands data
export const fetchBrandsData = createAsyncThunk(
  'home/fetchBrandsData',
  async () => {
    const brandsData = await getBrandsData();
    return brandsData;
  }
);

const initialState = {
  carousel: {
    toShow: true, // Controls whether to show the carousel section
    images: [],
    height: 600,
    autoPlay: true,
    interval: 5000,
    categoryLabels: ["LUXURY", "FASHION", "ACCESSORIES"],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  newArrival: {
    toShow: true,
    title: "New Arrivals",
    tabs: [],
    products: {},
    activeTab: "all",
    status: 'idle',
    error: null
  },
  brands: {
    toShow: true,
    imageUrl: "",
    status: 'idle',
    error: null
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // Action to change the active tab in new arrivals section
    setNewArrivalActiveTab: (state, action) => {
      state.newArrival.activeTab = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Carousel data reducers
      .addCase(fetchCarouselData.pending, (state) => {
        state.carousel.status = 'loading';
      })
      .addCase(fetchCarouselData.fulfilled, (state, action) => {
        // Update with fetched data
        if (action.payload) {
          // Preserve the current toShow value from state when updating
          const toShowValue = state.carousel.toShow;
          
          state.carousel = {
            ...action.payload,
            // Make sure we keep the toShow value from the API response
            // or from the current state if the API doesn't provide it
            toShow: action.payload.toShow !== undefined 
              ? action.payload.toShow 
              : toShowValue,
            status: 'succeeded',
            error: null
          };
        } else {
          // If no payload, just update status
          state.carousel.status = 'succeeded';
        }
      })
      .addCase(fetchCarouselData.rejected, (state, action) => {
        state.carousel.status = 'failed';
        state.carousel.error = action.error.message || 'Something went wrong';
      })
      
      // New arrival data reducers
      .addCase(fetchNewArrivalData.pending, (state) => {
        state.newArrival.status = 'loading';
      })
      .addCase(fetchNewArrivalData.fulfilled, (state, action) => {
        if (action.payload) {
          // Preserve the current toShow value and activeTab from state when updating
          const toShowValue = state.newArrival.toShow;
          const activeTabValue = state.newArrival.activeTab;
          
          state.newArrival = {
            ...action.payload,
            // Make sure we keep the toShow value from the API response
            // or from the current state if the API doesn't provide it
            toShow: action.payload.toShow !== undefined 
              ? action.payload.toShow 
              : toShowValue,
            // Keep the active tab or set it to the first tab if it doesn't exist
            activeTab: action.payload.tabs?.find(tab => tab.id === activeTabValue) 
              ? activeTabValue 
              : action.payload.tabs?.[0]?.id || 'all',
            status: 'succeeded',
            error: null
          };
        } else {
          state.newArrival.status = 'succeeded';
        }
      })
      .addCase(fetchNewArrivalData.rejected, (state, action) => {
        state.newArrival.status = 'failed';
        state.newArrival.error = action.error.message || 'Something went wrong';
      })
      
      // Brands data reducers
      .addCase(fetchBrandsData.pending, (state) => {
        state.brands.status = 'loading';
      })
      .addCase(fetchBrandsData.fulfilled, (state, action) => {
        if (action.payload) {
          // Preserve the current toShow value from state when updating
          const toShowValue = state.brands.toShow;
          
          state.brands = {
            toShow: action.payload.isShow !== undefined 
              ? action.payload.isShow 
              : toShowValue,
            imageUrl: action.payload['image-url'] || "",
            status: 'succeeded',
            error: null
          };
        } else {
          state.brands.status = 'succeeded';
        }
      })
      .addCase(fetchBrandsData.rejected, (state, action) => {
        state.brands.status = 'failed';
        state.brands.error = action.error.message || 'Something went wrong';
      });
  }
});

// Extract the action creators for export
export const { setNewArrivalActiveTab } = homeSlice.actions;

export default homeSlice.reducer;
