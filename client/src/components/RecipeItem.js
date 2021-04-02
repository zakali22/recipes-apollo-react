import React from "react"
import {Query, Mutation} from "react-apollo"
import FETCH_RECIPE from "../queries/fetchRecipe"
import ADD_LIKE from "../mutations/addLike"
import Error from "./Error"
import addLike from "../mutations/addLike"

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1)
}

const handleLike = (recipeId, addLikeFunc) => {
    addLikeFunc({
        variables: {
            recipeId
        }
    }).catch(e => {
        console.log(e)
    })
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
                            <Mutation mutation={ADD_LIKE}>
                            {(addLike, {error}) => {
                                return (
                                    <div className="recipe__details">
                                        <h1>{getRecipe.name}</h1>
                                        <p><strong>Created by:</strong> <em>{capitalize(getRecipe.createdBy.username)}</em></p>
                                        <p><strong>Category:</strong> {getRecipe.category}</p>
                                        <p><strong>Description:</strong> {getRecipe.description}</p>
                                        <p><strong>Likes:</strong> {getRecipe.likes}</p>
                                        <button className="btn btn--primary" onClick={() => handleLike(props.match.params.id, addLike)}>Like</button>
                                        {error && <Error errors={error.graphQLErrors} />}
                                    </div>
                                )
                            }}
                            </Mutation>
                        )
                    }}
                </Query>
            </div>
        </div>
    </div>
)

export default RecipeItem