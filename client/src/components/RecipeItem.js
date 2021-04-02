import React from "react"
import {Query} from "react-apollo"
import FETCH_RECIPE from "../queries/fetchRecipe"

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1)
}

const RecipeItem = (props) => (
    <div className="recipe">
        <div className="container">
            <div className="row center-xs">
                <Query query={FETCH_RECIPE} variables={{recipeId: props.match.params.id}}>
                    {({loading, data, error}) => {
                        if(loading) return <p>Loading</p>
                        if(error) return <p>Error</p>

                        const {getRecipe} = data
                        console.log(data)
                        return (
                            <div className="recipe__details">
                                <h1>{getRecipe.name}</h1>
                                <p><strong>Created by:</strong> <em>{capitalize(getRecipe.createdBy.username)}</em></p>
                                <p><strong>Category:</strong> {getRecipe.category}</p>
                                <p><strong>Description:</strong> {getRecipe.description}</p>
                                <p><strong>Likes:</strong> {getRecipe.likes}</p>
                                {/* <p>Created by: {getRecipe.createdBy}</p> */}
                                <button className="btn btn--primary">Like</button>
                            </div>
                        )
                    }}
                </Query>
            </div>
        </div>
    </div>
)

export default RecipeItem