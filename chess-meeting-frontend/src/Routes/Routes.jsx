import React, {useEffect, useState} from "react";
import {Switch, Route, BrowserRouter as Router, BrowserRouter} from "react-router-dom";

import SignIn from "../components/SignIn";
import UserNavbar from "../components/usercomponents/UserNavbar"

import Authorized from "../scripts/Authorized";
import Authentication from "../scripts/authentication";
import HomePage from "../components/usercomponents/HomePage";
import CalendarPage from "../components/usercomponents/CalendarPage";
import AccountPage from "../components/usercomponents/AccountPage";
import SearchPage from "../components/usercomponents/SearchPage";
import AdminNavbar from "../components/admincomponents/AminNavbar";

import NotFound from "./NotFound";
import CreateForm from "../components/usercomponents/CreateForm";
import ReservationOverview from "../components/usercomponents/ReservationOverview";

import ForumMainPage from "../components/usercomponents/forum/ForumMainPage";
import ForumCategoriesView from "../components/usercomponents/forum/ForumCategoriesView";
import ForumCreateForm from "../components/usercomponents/forum/ForumCreateForm";
import ForumUsersTopics from "../components/usercomponents/forum/ForumUsersTopics";
import ForumTopicView from "../components/usercomponents/forum/ForumTopicView";
import ForumAllTopicsView from "../components/usercomponents/forum/ForumAllTopicsView";
import Logs from "../components/admincomponents/Logs";
import AdminUsers from "../components/admincomponents/AdminUsers";
import AdminMeetings from "../components/admincomponents/AdminMeetings";
import AdminPosts from "../components/admincomponents/AdminPosts";
import Redirection from "../scripts/Redirection";

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
                        <Redirection>
                        <SignIn loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
                        </Redirection>
                    </Route>

                    <Route exact path="/home">
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <HomePage/>
                        </Authorized>
                    </Route>

                    <Route exact path="/calendar">
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <CalendarPage/>
                        </Authorized>
                    </Route>

                    <Route exact path="/reservations">
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <ReservationOverview/>
                        </Authorized>


                    </Route>

                    <Route exact path="/account">
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <AccountPage/>
                        </Authorized>
                    </Route>

                    <Route exact path="/search/:cityReservation" component={SearchPage}>
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <SearchPage/>
                        </Authorized>
                    </Route>

                    <Route exact path="/create">
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <CreateForm/>
                        </Authorized>
                    </Route>

                    <Route exact path="/forum">
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <ForumMainPage/>
                        </Authorized>
                    </Route>

                    <Route exact path="/forum/category/:category" component={ForumCategoriesView}>
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <ForumCategoriesView/>
                        </Authorized>
                    </Route>

                    <Route exact path="/forum/create-topic">
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <ForumCreateForm/>
                        </Authorized>
                    </Route>

                    <Route exact path="/forum/my-topics">
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <ForumUsersTopics/>
                        </Authorized>
                    </Route>

                    <Route exact path="/forum/recent">
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <ForumAllTopicsView/>
                        </Authorized>
                    </Route>

                    <Route exact path="/forum/topic/:id" component={ForumTopicView}>
                        <Authorized role={"USER"}>
                        <UserNavbar/>
                        <ForumTopicView/>
                        </Authorized>
                    </Route>


                    <Route exact path="/admin">
                        <Authorized role={"ADMIN"}>
                        <AdminNavbar/>
                        <Logs/>
                        </Authorized>
                    </Route>

                    <Route exact path="/admin/logs">
                        <Authorized role={"ADMIN"}>
                        <AdminNavbar/>
                        <Logs/>
                        </Authorized>
                    </Route>

                    <Route exact path="/admin/meetings">
                        <Authorized role={"ADMIN"}>
                        <AdminNavbar/>
                        <AdminMeetings/>
                        </Authorized>
                    </Route>

                    <Route exact path="/admin/posts">
                        <Authorized role={"ADMIN"}>
                        <AdminNavbar/>
                        <AdminPosts/>
                        </Authorized>
                    </Route>

                    <Route exact path="/admin/users">
                        <Authorized role={"ADMIN"}>
                        <AdminNavbar/>
                        <AdminUsers/>
                        </Authorized>
                    </Route>




                    <Route component={NotFound}/>






                </Switch>
            </Router>
        </BrowserRouter>
    )
};
export default Routes;