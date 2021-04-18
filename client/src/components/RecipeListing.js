import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {Query} from "react-apollo"
import FETCH_ALL_RECIPES from "../queries/fetchAllRecipes"

export default class RecipeListing extends Component {
    render() {
        return (
            <div className="recipe-listing">
                <div className="container">
                    <h1 className="title">Find Recipes You <strong>Love</strong></h1>
                    <div className="row">
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
                                                <Link to={`/recipes/${recipe._id}`} className="col-xs-12 col-sm-6 recipe-card" key={recipe._id}>
                                                    <div className="recipe-card__bg" style={{backgroundImage: `url(${recipe.imageUrl})`}}></div>
                                                    <span className={`recipe-card__category ${recipe.category}`}>{recipe.category}</span>
                                                    <div className="recipe-card__details">
                                                        <h3 className="recipe-card__details-name">{recipe.name}</h3>
                                                    </div>
                                                    <div className="recipe-card__overlay"></div>
                                                </Link>
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
