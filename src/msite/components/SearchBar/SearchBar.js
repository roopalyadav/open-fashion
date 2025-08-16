import React, { useState } from 'react';
import searchIcon from '../../assets/Search.svg';
import './SearchBar.scss';

function SearchBar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Trending search items
    const trendingSearches = [
        'Apparel',
        'Dress',
        'Bag',
        'Jacket',
        'Accessories'
    ];
    
    const openSearchSidebar = () => {
        setIsSearchOpen(true);
        // Prevent body scrolling when sidebar is open
        document.body.style.overflow = 'hidden';
    };
    
    const closeSearchSidebar = () => {
        setIsSearchOpen(false);
        // Restore body scrolling
        document.body.style.overflow = 'auto';
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to products page with search query parameter
            window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
            setSearchQuery('');
            closeSearchSidebar();
        }
    };
    
    const handleTrendingItemClick = (item) => {
        // Navigate to products page with the trending item as search query
        window.location.href = `/products?search=${encodeURIComponent(item)}`;
        setSearchQuery('');
        closeSearchSidebar();
    };
    
    return (
        <>
            <div className="search-icon" onClick={openSearchSidebar}>
                <img src={searchIcon} alt="Search Icon" />
            </div>
            
            {/* Search Sidebar Overlay */}
            {isSearchOpen && (
                <div className="search-sidebar-overlay">
                    {/* Stop propagation to prevent closing when clicking inside the sidebar */}
                    <div className="search-sidebar">
                        <div className="search-header">
                            <div className="search-container">
                                <div className="search-input-container">
                                    <img src={searchIcon} alt="Search" className="search-input-icon" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                                        placeholder="Search items"
                                        className="search-input"
                                        autoFocus
                                    />
                                </div>
                                <div className="close-button" onClick={closeSearchSidebar}>
                                    ✕
                                </div>
                            </div>
                        </div>
                        
                        <div className="search-content">
                            <div className="trending-title">Popular search terms</div>
                            <ul className="trending-list">
                                {trendingSearches.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className="trending-item"
                                        onClick={() => handleTrendingItemClick(item)}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SearchBar;
