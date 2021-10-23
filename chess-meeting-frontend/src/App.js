import { render } from '@testing-library/react';
import React, {Component} from 'react';
import {BrowserRouter, Route, Router, Switch, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";

import "./App.css"


import Authentication from "./scripts/authentication";
import Routes from "./Routes/Routes";
import SignIn from "./components/SignIn";


function App(){

  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    setLoggedUser(Authentication.getCurrentUser());
  }, []);

  return (
        <BrowserRouter>
            <Switch>

              <Route exact path="/">
                <SignIn/>
              </Route>



            </Switch>
        </BrowserRouter>

  );


}

export default App;