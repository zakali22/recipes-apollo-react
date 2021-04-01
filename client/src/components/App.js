import './App.css';
import React from 'react';
import {Route, Switch} from "react-router-dom"
import Layout from "./Layout"
import RecipeListing from "./RecipeListing"
import Signup from "./Signup"
import Signin from "./Signin"
import Profile from "./Profile"

function App() {
  return (
    <Layout>
      <div className="App">
        <Switch>
          <Route exact path="/" component={RecipeListing} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Layout>
  );
}

export default App;
