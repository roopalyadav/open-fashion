import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridView from './GridView';
import ListView from './ListView';
import './ProductListing.scss';
import { 
  fetchProductListingData,
  setViewType,
  setSortByFilter
} from '../../redux/slices/listingSlice';


// A helper function to render the product section based on status
const renderProductSection = ({ status, viewType, filteredProducts }) => {
  // Handle loading state
  if (status === 'loading') {
    return <div className="loading-indicator">Loading products...</div>;
  }
  
  // Handle error state
  if (status === 'failed') {
    return <div className="error-message">Error loading products. Please try again.</div>;
  }
  
  // Render appropriate view based on viewType
  return viewType === 'grid' ? (
    <GridView products={filteredProducts} />
  ) : (
    <ListView products={filteredProducts} />
  );
};

const ProductListing = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts, viewType, status, activeFilters } = useSelector(state => state.listing);
  const sortBy = activeFilters.sortBy;

  useEffect(() => {
    // Fetch products when component mounts if not already loaded
    if (status === 'idle') {
      dispatch(fetchProductListingData());
    }
  }, [dispatch, status]);

  return (
    <div className="product-listing-container">
      <div className="listing-header">
        {/* <h1 className="listing-title">Product Collection</h1> */}
        <div className="listing-options">
          <div className="category-name">
            {activeFilters.category === 'all' ? 'All Products' : activeFilters.category}
          </div>
          {/* <div className="sort-options">
            <select 
              value={sortBy}
              onChange={(e) => dispatch(setSortByFilter(e.target.value))}
              className="sort-select"
            >
              <option value="popularity">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div> */}
          <div className="view-toggle">
            <div className="view-switcher" onClick={() => dispatch(setViewType(viewType === 'grid' ? 'list' : 'grid'))}>
              {viewType === 'grid' ? (
                <img 
                  src="https://ik.imagekit.io/d6em7wa1j/open-fashion/Listview.png?updatedAt=1754592858804"
                  alt="Switch to List View"
                  className="view-icon list-icon"
                />
              ) : (
                <img 
                  src="https://ik.imagekit.io/d6em7wa1j/open-fashion/grid%20view.png?updatedAt=1754592858586"
                  alt="Switch to Grid View"
                  className="view-icon grid-icon"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="product-view">
        {renderProductSection({
          status,
          viewType,
          filteredProducts
        })}
      </div>
    </div>
  );
};

export default ProductListing;
