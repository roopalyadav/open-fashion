import React from 'react';
import './GridView.scss';

const GridView = ({ products }) => {
  return (
    <div className="grid-view">
      {products.map(product => (
        <div key={product.id} className="grid-item">
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
            <div className="product-rating">
              {Array(5).fill().map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>
                  ★
                </span>
              ))}
              <span className="rating-number">({product.rating})</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;
