import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridView from './GridView';
import ListView from './ListView';
import './ProductListing.scss';
import { 
  fetchProductListingData,
  setViewType,
  loadMoreProducts
} from '../../redux/slices/listingSlice';


// A helper function to render the product section based on status
const renderProductSection = ({ status, viewType, displayedProducts, hasMore, onLoadMore }) => {
  // Handle loading state
  if (status === 'loading') {
    return <div className="loading-indicator">Loading products...</div>;
  }
  
  // Handle error state
  if (status === 'failed') {
    return <div className="error-message">Error loading products. Please try again.</div>;
  }
  
  return (
    <div className="product-section">
      {/* Render appropriate view based on viewType */}
      {viewType === 'grid' ? (
        <GridView products={displayedProducts} />
      ) : (
        <ListView products={displayedProducts} />
      )}
      
      {/* Load More button */}
      {hasMore && (
        <div className="load-more-container">
          <div className="load-more-button" onClick={onLoadMore}>
            Load More
          </div>
        </div>
      )}
    </div>
  );
};

const ProductListing = () => {
  const dispatch = useDispatch();
  const { 
    products, 
    displayedProducts, 
    viewType, 
    status, 
    activeFilters,
    pagination
  } = useSelector(state => state.listing);
  const hasMore = pagination.hasMore;

  useEffect(() => {
    // Fetch products when component mounts if not already loaded
    if (status === 'idle') {
      dispatch(fetchProductListingData());
    }
  }, [dispatch, status]);

  return (
    <div className="product-listing-container">
      <div className="listing-header">
        <div className="listing-options">
          <div className="category-name">
            {activeFilters.category === 'all' ? 'All Products' : activeFilters.category}
          </div>
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
          displayedProducts,
          hasMore,
          onLoadMore: () => dispatch(loadMoreProducts())
        })}
      </div>
    </div>
  );
};

export default ProductListing;
