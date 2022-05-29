import {
    Redirect
} from 'react-router-dom';
import React from "react";

import authentication from './authentication';


export default function Authorized(props) {


    if(authentication.isLoggedIn() && authentication.hasRole(props.role)){
        return props.children;
    } else {
        return <Redirect to="/" />;
    }

}
