import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NavBar from './NavBar';
import Home from './pages/Home.js';
import ViewListings from './pages/ViewListings.js';
import CreateListing from './pages/CreateListing.js';
import ManageListings from './pages/ManageListings.js';
import Messages from './pages/Messages.js';
import VerifyAccount from './pages/VerifyAccount.js';
import VerifiedAccount from './pages/VerifiedAccount.js';

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
        <Route path="/verify" element={<VerifyAccount />} />
        <Route path="/verified" element={<VerifiedAccount />} />
      </Routes>
    </Router>
  );
}

export default App;