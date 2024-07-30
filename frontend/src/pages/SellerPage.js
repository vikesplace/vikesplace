import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DataService from '../services/DataService.js';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const SellerPage = () => {
    const { id } = useParams();

    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const dataService = new DataService();
            try {
                const sellerResponse = await dataService.getUserData(id);
                if (sellerResponse === undefined || sellerResponse.status !== 200) {
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
    }, [id]);

    if (loading) return 
        (<div>
            <Typography align="center" variant='h6' sx={{mt: 2}}>
                Loading...
            </Typography>
        </div>);
    if (error) return 
        (<div>
            <Typography align="center" variant='h6' sx={{mt: 2}} color="error">
                Seller Information Not Available
            </Typography>
        </div>);

    return (
        <Container>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                minHeight="100vh"
                bgcolor="background.paper"
            >
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
                        <Typography>No Seller Information Available</Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default SellerPage;
