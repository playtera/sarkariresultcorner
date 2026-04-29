'use client';

import React from 'react';
import Link from 'next/link';
import { X, Search } from 'lucide-react';

const SearchOverlay = ({ isOpen, onClose, searchQuery, setSearchQuery, onSearch }) => {
  if (!isOpen) return null;

  return (
    <div className={`search-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className="search-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <h3>Search Sarkari Results</h3>
          <button className="close-search" onClick={onClose} aria-label="Close search">
            <X size={24} />
          </button>
        </div>
        <form className="search-form" onSubmit={onSearch}>
          <div className="search-input-wrapper">
            <Search className="search-icon-inner" size={24} />
            <input 
              type="text" 
              placeholder="Search jobs, results, admit cards..." 
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-submit-btn">Search</button>
          </div>
        </form>
        <div className="search-quick-links">
          <span>Quick Links:</span>
          <Link href="/latest-jobs" onClick={onClose}>Latest Jobs</Link>
          <Link href="/result" onClick={onClose}>Results</Link>
          <Link href="/admit-cards" onClick={onClose}>Admit Cards</Link>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
