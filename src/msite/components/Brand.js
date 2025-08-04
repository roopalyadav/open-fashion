import React from 'react';

function Brand({ imageUrl }) {
  return (
    <div className="brand-image-container">
      <img 
        src={imageUrl}
        alt="Our Brand Partners"
        className="responsive-image"
      />
    </div>
  )
}

export default Brand