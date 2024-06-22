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
import ListingDetailsPage from './pages/ListingDetailsPage.js';
import EditListing from './pages/EditListing.js';
import Login from './pages/Login.js';
import RequestAccount from './pages/RequestAccount.js'
import CheckYourEmail from './pages/CheckYourEmail.js';
import MessageHistory from './pages/MessageHistory.js';
import UserProfile from './pages/UserProfile.js';


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
        <Route path="/request-account" element={<RequestAccount />} />
        <Route path="/check-email" element={<CheckYourEmail />} />
        <Route path="/listings/:id" element={<ListingDetailsPage />} />
        <Route path="/edit-listing/:id" element={<EditListing />} />
        <Route path="/message-history/:id" element={<MessageHistory />} />
        <Route path="/user-profile" element={<UserProfile />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;