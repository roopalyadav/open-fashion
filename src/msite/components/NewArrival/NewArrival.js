import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './NewArrival.scss';
import { setNewArrivalActiveTab } from '../../redux/slices/homeSlice';

function NewArrival({ title, tabs, products, activeTab }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Change the active tab
  const handleTabClick = (tabId) => {
    dispatch(setNewArrivalActiveTab(tabId));
  };
  
  // Navigate to products listing page and scroll to top
  const handleExploreMoreClick = () => {
    navigate('/products');
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  // Get products for the active tab
  const activeProducts = products[activeTab] || [];

  return (
    <div className="new-arrival">
      <div className="section-title decorated-title">
        {title}
        <span className="diamond"></span>
      </div>

      {/* Tab navigation */}
      <div className="tab-navigation">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-button ${tab.id === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Product grid */}
      <div className="product-grid">
        {activeProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
            </div>
            <div className="product-details">
              <div className="product-title">{product.title}</div>
              <div className="product-price">${product.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More button */}
      <div className="explore-more-container">
        <div 
          className="explore-more-button"
          onClick={handleExploreMoreClick}
          role="button"
        >
          Explore More
          <span className="arrow-right">→</span>
        </div>
      </div>
    </div>
  );
}

export default NewArrival;
