import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import GridView from './GridView';
import ListView from './ListView';
import './ProductListing.scss';
import { 
  fetchProductListingData,
  setViewType,
  loadMoreProducts,
  setSearchTermFilter
} from '../../redux/slices/listingSlice';


// A helper function to render the product section based on status
const renderProductSection = ({ status, viewType, displayedProducts, hasMore, onLoadMore, searchTerm }) => {
  // Handle loading state
  if (status === 'loading') {
    return <div className="loading-indicator">Loading products...</div>;
  }
  
  // Handle error state
  if (status === 'failed') {
    return <div className="error-message">Error loading products. Please try again.</div>;
  }
  
  // Handle no search results
  if (searchTerm && displayedProducts.length === 0) {
    return (
      <div className="no-results-message">
        <div>No products found</div>
        <p>Sorry, we couldn't find any products matching "{searchTerm}".</p>
        <p>Please try a different search term or browse our categories.</p>
      </div>
    );
  }
  
  // Handle no products at all (when no search term)
  if (!searchTerm && displayedProducts.length === 0) {
    return (
      <div className="no-results-message">
        <div>No products available</div>
        <p>There are currently no products to display.</p>
      </div>
    );
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
  const [searchParams] = useSearchParams();
  const { 
    products, 
    displayedProducts, 
    viewType, 
    status, 
    activeFilters,
    pagination
  } = useSelector(state => state.listing);
  const searchTerm = searchParams.get('search') || '';
  const hasMore = pagination.hasMore;

  // Set search term immediately when component mounts (before data loading)
  useEffect(() => {
    dispatch(setSearchTermFilter(searchTerm));
  }, [dispatch, searchTerm]);

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
            {searchTerm 
              ? `Search results for: "${searchTerm}"`
              : activeFilters.category === 'all' ? 'All Products' : activeFilters.category}
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
          searchTerm,
          onLoadMore: () => dispatch(loadMoreProducts())
        })}
      </div>
    </div>
  );
};

export default ProductListing;
