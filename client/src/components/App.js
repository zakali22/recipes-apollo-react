import './App.css';
import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom"
import Layout from "./Layout"
import RecipeListing from "./RecipeListing"
import RecipeItem from "./RecipeItem"
import AddRecipe from "./AddRecipe"
import Search from "./Search"

import Signup from "./Signup"
import Signin from "./Signin"
import Profile from "./Profile"

function App() {
  return (
    <Layout>
      <div className="page-content">
        <Switch>
          <Route exact path="/" component={RecipeListing} />
          <Route exact path="/recipes" component={RecipeListing} />
          <Route path="/recipes/add" component={AddRecipe} />
          <Route path="/recipes/:id" component={RecipeItem} />
          <Route path="/search" component={Search} />
          
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Layout>
  );
}

export default App;
