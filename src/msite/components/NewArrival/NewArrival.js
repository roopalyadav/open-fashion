import React from 'react';
import { useDispatch } from 'react-redux';
import './NewArrival.scss';
import { setNewArrivalActiveTab } from '../../redux/slices/homeSlice';

function NewArrival({ title, tabs, products, activeTab }) {
  const dispatch = useDispatch();
  
  // Change the active tab
  const handleTabClick = (tabId) => {
    dispatch(setNewArrivalActiveTab(tabId));
  };
  
  // Get products for the active tab
  const activeProducts = products[activeTab] || [];
  
  return (
    <div className="new-arrival">
            <div className="section-title with-underline">
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
                loading="eager"
                decoding="sync"
                draggable="false"
              />
            </div>
            <div className="product-details">
              <div className="product-title">{product.title}</div>
              <div className="product-price">${product.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewArrival;
