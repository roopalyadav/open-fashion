import React, { useState } from 'react';
import './Header.scss';
import SideMenu from '../SideMenu/SideMenu';
import SearchBar from '../SearchBar/SearchBar';
import Cart from '../Cart/Cart';
import logo from '../../assets/Logo.svg';

function Header() {
  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <div className='header-wrapper'>
        <SideMenu />
        <div className='w-60 text-center'>
          <img 
            src={logo} 
            alt="Logo" 
            onClick={handleLogoClick}
          />
        </div>
        <div className='w-20 display-flex justify-content-end'>
          <SearchBar />
          <Cart />
        </div>
    </div>
  );
}

export default Header;
