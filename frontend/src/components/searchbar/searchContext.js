// SearchContext.js
import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery,setSearchQuery] = useState('')

  return (
    <SearchContext.Provider value={{ showSearch, setShowSearch, searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
