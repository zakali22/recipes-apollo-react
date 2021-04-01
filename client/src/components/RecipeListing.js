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
                            {({loading, data, error}) => {
                                if(loading) return <p>Loading</p>
                                if(error) return <p>{error.message}</p>

                                const {getAllRecipes} = data
                                console.log(data)
                                return (  
                                    <React.Fragment>
                                    {
                                        getAllRecipes.map(recipe => (
                                        <div className="col-xs-6">
                                            <div className="recipe-listing__details">
                                                <h1>{recipe.name}</h1>
                                                <p>{recipe.category}</p>
                                                <p>{recipe.description}</p>
                                                <p>Likes: {recipe.likes}</p>
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
