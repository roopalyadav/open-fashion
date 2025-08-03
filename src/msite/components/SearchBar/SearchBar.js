import React from 'react';
import searchIcon from '../../assets/Search.svg';

function SearchBar() {
    return (
    <div style={{marginRight: '15px'}}>
        <img src={searchIcon} alt="Search Icon" />
    </div>
    );
}

export default SearchBar;
