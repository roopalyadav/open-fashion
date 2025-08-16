import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile';
import ProductListing from './components/ProductListing/ProductListing';
import ProductInfo from './components/ProductInfo/ProductInfo';

function MobileRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:productId/description" element={<ProductInfo />} />
        {/* Add more mobile routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default MobileRouter;
