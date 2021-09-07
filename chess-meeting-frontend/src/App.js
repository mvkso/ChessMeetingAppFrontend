import { render } from '@testing-library/react';
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";

import "./App.css"


import Authentication from "./scripts/authentication";
import Routes from "./Routes/Routes";


function App(){

  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    setLoggedUser(Authentication.getCurrentUser());
  }, []);

  return (
      <div className="App">
        {/*<Routes/>*/}
      </div>

  );


}

export default App;