import React, { useState, useEffect } from 'react';
import './Carousel.scss';

function Carousel({ images = [], height = 600, autoPlay = true, interval = 5000, categoryLabels = ["LUXURY", "FASHION", "ACCESSORIES"] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  
  // Handle autoplay
  useEffect(() => {
    let slideInterval;
    
    if (isAutoPlaying && images.length > 0) {
      slideInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
      }, interval);
    }
    
    return () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, [isAutoPlaying, images.length, interval]);
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  const handleExploreClick = () => {
    window.location.href = '/products';
  };
  
  return (
    <div className="carousel" style={{ height: `${height}px` }}>
      <div className="category-labels">
        {categoryLabels.map((label, index) => (
          <div 
            key={index} 
            className="category-label"
            style={index === 1 ? {marginLeft: '3%'} : {}}
          >
            {index === 2 ? '&' + label : label}
          </div>
        ))}
      </div>
      
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
            style={{
              height: `${height}px`
            }}
          >
            <img 
              src={image.src} 
              alt={image.caption?.title || `Slide ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </div>
      
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button 
            key={index} 
            className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      
      <div className="explore-collection-container">
        <div 
          className="explore-collection-button"
          onClick={handleExploreClick}
        >
          Explore Collection
        </div>
      </div>
    </div>
  );
}

export default Carousel;
