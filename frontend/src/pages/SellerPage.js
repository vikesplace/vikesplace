import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DataService from '../services/DataService.js';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const SellerPage = () => {
    const location = useLocation();
    const dataService = new DataService();
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listingId = location.state?.listingId;
                if (!listingId) {
                    throw new Error("Listing ID is required");
                }

                // Fetch listing information
                const listingResponse = await dataService.getListing(listingId);
                if (listingResponse.status !== 200) {
                    throw new Error('Failed to fetch listing');
                }
                const listing = listingResponse.data;

                // Fetch seller information
                const sellerId = listing.sellerId;
                const sellerResponse = await dataService.getUserData(sellerId);
                if (sellerResponse.status !== 200) {
                    throw new Error('Failed to fetch seller');
                }
                setSeller(sellerResponse.data);
            } catch (err) {
                setError(err.message);
                Store.addNotification({
                    title: 'Error',
                    message: err.message,
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location.state?.listingId]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box
            border={1}
            borderRadius={5}
            borderColor="grey.300"
            p={4}
            textAlign="left"
            boxShadow={3}
            mt={2}
        >
            {seller ? (
                <>
                    <Typography variant="h4" component="h3" gutterBottom>
                        Seller: {seller.username}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Location: {seller.location}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Joined: {new Date(seller.joiningDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Items Sold: {seller.itemsSold}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Items Purchased: {seller.itemsPurchased}
                    </Typography>
                </>
            ) : (
                <Typography>No seller information available.</Typography>
            )}
        </Box>
    );
};

export default SellerPage;
