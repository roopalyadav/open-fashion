import React, { useState, useRef, useEffect } from 'react';
import './JustForYou.scss';

function JustForYou({ title, products }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Handle dot click to scroll to position
  const handleDotClick = (index) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.querySelector('.product-item').offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll event to update the active dot
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const itemWidth = container.querySelector('.product-item').offsetWidth;
    const scrollPosition = container.scrollLeft;
    
    // Calculate which item is most visible
    const newIndex = Math.round(scrollPosition / itemWidth);
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < products.length) {
      setActiveIndex(newIndex);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex]);

  return (
    <div className="just-for-you">
      <div className="section-title decorated-title">
        {title}
        <span className="diamond"></span>
      </div>

      {/* Horizontally scrollable container */}
      <div 
        className="product-scroll-container" 
        ref={scrollContainerRef}
      >
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={`product-item ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          >
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
      
      {/* Carousel indicators */}
      <div className="carousel-indicators">
        {products.map((_, index) => (
          <button 
            key={index} 
            className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default JustForYou;
