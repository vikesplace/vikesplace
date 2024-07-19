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
import RequestPasswordChange from './pages/RequestPasswordChange.js';
import CompletePasswordChange from './pages/CompletePasswordChange.js';
import PasswordUpdated from './pages/PasswordUpdated.js';
import ViewReviewsPage from './pages/ViewReviewsPage.js';
import PageNotFound from './pages/PageNotFound.js';

function App() {  
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Access if logged out */}
        <Route path="/login" element={<Login />} />
        <Route path="/request-account" element={<RequestAccount />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/verified" element={<VerifiedAccount />} />
        <Route path="/check-email" element={<CheckYourEmail />} />
        <Route path="/password-change" element={<RequestPasswordChange />} />
        <Route path="/password-update" element={<CompletePasswordChange />} />
        <Route path="/password-updated" element={<PasswordUpdated />} />
        
        {/* Access if logged in */}
        <Route path="/" element={<Home />} /> 
        <Route path="/view-listings" element={<ViewListings />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/manage-listings" element={<ManageListings />} />
        <Route path="/listings/:id" element={<ListingDetailsPage />} />
        <Route path="/edit-listing/:id" element={<EditListing />} />
        <Route path="/view-reviews/:id" element={<ViewReviewsPage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/message-history/:id" element={<MessageHistory />} />
        <Route path="/history" element={<SearchHistory />} />
        <Route path="/user-profile" element={<UserProfile />} />

        {/* Add other routes here */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;