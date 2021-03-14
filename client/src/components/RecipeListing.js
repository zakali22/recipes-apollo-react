import React, { Component } from 'react'
import {Query} from "react-apollo"
import FETCH_ALL_RECIPES from "../queries/fetchAllRecipes"

export default class RecipeListing extends Component {
    render() {
        return (
            <div className="recipe-listing">
                <div className="container">
                    <h1>Recipe listing</h1>
                    <div className="row">
                        <Query query={FETCH_ALL_RECIPES}>
                            {({loading, data}) => {
                                if(loading) return <p>Loading</p>

                                const {getAllRecipes} = data
                                console.log(getAllRecipes)
                                return (  
                                    <React.Fragment>
                                    {
                                        getAllRecipes.map(recipe => (
                                        <div className="col-xs-6">
                                            <div className="recipe-listing__details">
                                                <h1>{recipe.name}</h1>
                                                <p>{recipe.category}</p>
                                                <p>{recipe.description}</p>
                                            </div>
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
        )
    }
}
