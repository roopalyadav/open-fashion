import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductInfo.scss';

const ProductInfo = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load product data based on productId
    const loadProductData = async () => {
      try {
        setLoading(true);
        // Import the product data
        const { default: listingPageData } = await import('../../json/listingPageData.json');
        
        // Find the specific product by ID
        const foundProduct = listingPageData.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product data');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProductData();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="product-info-container">
        <div className="loading-message">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-info-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.history.back()}>Go Back</button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-info-container">
        <div className="not-found-message">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <button onClick={() => window.history.back()}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-info-container">
      <div className="product-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h1 className="page-title">Product Details</h1>
      </div>

      <div className="product-content">
        <div className="product-image-section">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-main-image"
          />
        </div>

        <div className="product-details-section">
          <h2 className="product-title">{product.title}</h2>
          
          <div className="product-price">${product.price.toFixed(2)}</div>
          
          <div className="product-rating">
            <div className="stars">
              {Array(5).fill().map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-text">({product.rating}) Rating</span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-categories">
            <h3>Categories</h3>
            <div className="category-tags">
              {product.categories.map((category, index) => (
                <span key={index} className="category-tag">{category}</span>
              ))}
            </div>
          </div>

          <div className="product-sizes">
            <h3>Available Sizes</h3>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <span key={index} className="size-option">{size}</span>
              ))}
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
