import React from 'react'

function Collection({ imageUrl }) {
  return (
    <div className="collection-image-container">
      <img 
        src={imageUrl}
        alt="Our Collection"
        className="responsive-image"
      />
    </div>
  )
}

export default Collection