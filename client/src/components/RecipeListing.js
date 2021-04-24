import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {Query} from "react-apollo"
import FETCH_ALL_RECIPES from "../queries/fetchAllRecipes"
import RecipeCard from "./RecipeCard"

export default class RecipeListing extends Component {
    render() {
        return (
            <div className="recipe-listing">
                <div className="container">
                    <h1 className="title">Find Recipes You <strong>Love</strong></h1>
                    <div className="row between-xs">
                        <Query query={FETCH_ALL_RECIPES} fetchPolicy={'cache-and-network'}>
                            {({loading, data, error}) => {
                                if(loading) return <p>Loading</p>
                                if(error) return <p>{error.message}</p>

                                const {getAllRecipes} = data
                                console.log(data)
                                return (  
                                    <React.Fragment>
                                    {
                                        getAllRecipes.length > 0 ? (
                                            getAllRecipes.map(recipe => (
                                                <RecipeCard recipe={recipe} key={recipe._id} isSingle={getAllRecipes.length === 1}/>
                                            ))
                                        ) : (
                                            <p>There are no recipes to list</p>
                                        )

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
