import React from 'react';
import { Link } from 'react-router-dom';
import Title from "../Title";

const NotFound = () => (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>404 - not found</Title>
        <Link style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}} to="/">go home</Link>
        <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold", fontSize: "10px", marginTop: "50px"}}>chess meeting app company</Title>
    </div>
);

export default NotFound;