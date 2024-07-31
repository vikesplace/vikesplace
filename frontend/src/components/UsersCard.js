import { Card, CardActionArea, CardHeader } from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom';

export default function UserCard({id, username}){

    return(
        <Card>
            <CardActionArea component={Link} to={`/sellers/${id}`}>
                <CardHeader title = {username}></CardHeader>
            </CardActionArea>
        </Card>
    );
}