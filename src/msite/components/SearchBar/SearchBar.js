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
        // Here you would implement the actual search logic
        console.log('Searching for:', searchQuery);
        // For now, we'll just close the sidebar
        closeSearchSidebar();
    };
    
    const handleTrendingItemClick = (item) => {
        setSearchQuery(item);
        // Optional: Auto-search when clicking a trending item
        // handleSearch({ preventDefault: () => {} });
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
