import React from 'react';
import './ListView.scss';

const ListView = ({ products }) => {
  return (
    <div className="list-view">
      {products.map(product => (
        <div key={product.id} className="list-item">
          <div className="product-image-container">
            <img 
              src={product.image} 
              alt={product.title} 
              className="product-image"
            />
          </div>
          <div className="product-details">
            <div className="product-title">{product.title}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-meta">
              <div className="product-price">${product.price.toFixed(2)}</div>
              <div className="product-rating">
                {Array(5).fill().map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
                <span className="rating-number">({product.rating})</span>
              </div>
              <div className="product-sizes">
                <span className="sizes-label">Sizes: </span>
                {product.sizes.join(', ')}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;
