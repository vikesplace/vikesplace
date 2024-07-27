import { Card, CardActionArea, CardHeader } from "@mui/material";
import React from "react";

export default function UserCard({username}){

    return(
        <Card>
            <CardActionArea>
                <CardHeader title = {username}></CardHeader>
            </CardActionArea>
        </Card>
    );
}