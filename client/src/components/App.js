import './App.css';
import {Query} from "react-apollo"
import FETCH_ALL_RECIPES from "../queries/fetchAllRecipes"
import React from 'react';
import Layout from "./Layout"

function App() {
  return (
    <Layout>
      <div className="App">
        <div className="container">
          <div className="row">
              <Query query={FETCH_ALL_RECIPES}>
                {({loading, data}) => {
                  if(loading) return <p>Loading</p>

                  const {getAllRecipes} = data
                  return (  
                    <React.Fragment>
                      {
                        getAllRecipes.map(recipe => (
                          <div className="col-xs-6">
                            <h1>{recipe.name}</h1>
                            <p>{recipe.category}</p>
                            <p>{recipe.description}</p>
                          </div>
                        ))
                      }
                    </React.Fragment>
                  )
                }}
              </Query>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
