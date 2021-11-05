import React, {useEffect, useState} from "react";
import {Switch, Route, BrowserRouter as Router, BrowserRouter} from "react-router-dom";

import SignIn from "../components/SignIn";
import UserNavbar from "../components/usercomponents/UserNavbar"

import Authorized from "../scripts/Authorized";
import Authentication from "../scripts/authentication";
import HomePage from "../components/usercomponents/HomePage";

const Routes = () => {
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        setLoggedUser(Authentication.getCurrentUser());
    }, []);


    return(
        <BrowserRouter>
            <Router>
                <Switch>

                    <Route exact path="/">
                        {/*<Redirection>*/}
                        <SignIn loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
                        {/*</Redirection*/}
                    </Route>

                    <Route exact path="/home">
                        <UserNavbar/>
                        <HomePage/>
                    </Route>

                </Switch>
            </Router>
        </BrowserRouter>
    )
};
export default Routes;