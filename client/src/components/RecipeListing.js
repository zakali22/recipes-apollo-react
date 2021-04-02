import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {Query} from "react-apollo"
import FETCH_ALL_RECIPES from "../queries/fetchAllRecipes"

export default class RecipeListing extends Component {
    render() {
        return (
            <div className="recipe-listing">
                <div className="container">
                    <h1>Recipe listing</h1>
                    <div className="row">
                        <Query query={FETCH_ALL_RECIPES} pollInterval={0} fetchPolicy={'cache-and-network'}>
                            {({loading, data, error}) => {
                                if(loading) return <p>Loading</p>
                                if(error) return <p>{error.message}</p>

                                const {getAllRecipes} = data
                                console.log(data)
                                return (  
                                    <React.Fragment>
                                    {
                                        getAllRecipes.map(recipe => (
                                        <Link to={`/recipes/${recipe._id}`} className="col-xs-6" key={recipe._id}>
                                            <div className="recipe-listing__details">
                                                <h1>{recipe.name}</h1>
                                                <p>{recipe.category}</p>
                                                <p>{recipe.description}</p>
                                                <p>Likes: {recipe.likes}</p>
                                            </div>
                                        </Link>
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
