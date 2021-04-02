import './App.css';
import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom"
import Layout from "./Layout"
import RecipeListing from "./RecipeListing"
import RecipeItem from "./RecipeItem"

import Signup from "./Signup"
import Signin from "./Signin"
import Profile from "./Profile"

function App() {
  return (
    <Layout>
      <div className="App">
        <Switch>
          <Route exact path="/" component={RecipeListing} />
          <Route exact path="/recipes" component={RecipeListing} />
          <Route path="/recipes/:id" component={RecipeItem} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Layout>
  );
}

export default App;
