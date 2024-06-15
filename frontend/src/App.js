import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.js';
import Home from './pages/Home.js';
import ViewListings from './pages/ViewListings.js';
import CreateListing from './pages/CreateListing.js';
import ManageListings from './pages/ManageListings.js';
import Messages from './pages/Messages.js';
import VerifyAccount from './pages/VerifyAccount.js';
import VerifiedAccount from './pages/VerifiedAccount.js';
import SearchHistory from './pages/SearchHistory.js';
import Login from './pages/Login.js';

function App() {  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/view-listings" element={<ViewListings />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/manage-listings" element={<ManageListings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyAccount />} /> {/* TODO: modify /verify to use parameters from email verification*/}
        <Route path="/verified" element={<VerifiedAccount />} />
        <Route path="/history" element={<SearchHistory />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;