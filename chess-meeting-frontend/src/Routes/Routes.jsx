import React, {useEffect, useState} from "react";
import {Switch, Route, BrowserRouter as Router, BrowserRouter} from "react-router-dom";

import SignIn from "../components/SignIn";
import UserNavbar from "../components/usercomponents/UserNavbar"

import Authorized from "../scripts/Authorized";
import Authentication from "../scripts/authentication";
import HomePage from "../components/usercomponents/HomePage";
import CalendarPage from "../components/usercomponents/CalendarPage";
import MyReservations from "../components/usercomponents/MyReservations";
import AccountPage from "../components/usercomponents/AccountPage";
import SearchPage from "../components/usercomponents/SearchPage";
import AdminNavbar from "../components/admincomponents/AminNavbar";

import NotFound from "./NotFound";
import CreateForm from "../components/usercomponents/CreateForm";


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

                    <Route exact path="/calendar">
                        <UserNavbar/>
                        <CalendarPage/>
                    </Route>

                    <Route exact path="/reservations">
                        <UserNavbar/>
                        <section style={{display: "flex", flexDirection: "row", paddingLeft: "20px", justifyContent: "space-around"}}>
                            <MyReservations/>
                            <MyReservations color = "secondary"/>
                        </section>

                    </Route>

                    <Route exact path="/account">
                        <UserNavbar/>
                        <AccountPage/>
                    </Route>

                    <Route exact path="/search">
                        <UserNavbar/>
                        <SearchPage/>
                    </Route>

                    <Route exact path="/create">
                        <UserNavbar/>
                        <CreateForm/>
                    </Route>

                    <Route exact path="/adminPanel">
                        <AdminNavbar/>
                    </Route>



                    <Route component={NotFound}/>






                </Switch>
            </Router>
        </BrowserRouter>
    )
};
export default Routes;