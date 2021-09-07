import {
    Redirect
} from 'react-router-dom';
import React from "react";

import authentication from './authentication';


export default function Authorized(props) {
    /*
    Authorization component. It checks whether user is either employee or user and allows or denies access to a given component.
     */

    if(authentication.isLoggedIn() && authentication.hasRole(props.role)){
        return props.children;
    } else {
        return <Redirect to="/" />;
    }

}
