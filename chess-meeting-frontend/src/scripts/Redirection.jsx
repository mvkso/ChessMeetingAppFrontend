import {
    Redirect
} from 'react-router-dom';
import React from "react";

import authentication from './authentication';

export default function Redirection(props) {



    if (authentication.isLoggedIn() && authentication.hasRole("ADMIN")) {
        return <Redirect to="/admin"/>
    }

    if (authentication.isLoggedIn() && authentication.hasRole("USER")) {
        return <Redirect to="/home"/>
    }

    if(authentication.isLoggedIn() === false){
        return props.children;
    }


}

