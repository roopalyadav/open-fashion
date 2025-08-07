import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile';
import ProductListing from './components/ProductListing/ProductListing';

function MobileRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ProductListing />} />
        {/* Add more mobile routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default MobileRouter;
