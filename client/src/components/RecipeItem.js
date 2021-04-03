import React from "react"
import {Query, Mutation} from "react-apollo"
import FETCH_RECIPE from "../queries/fetchRecipe"
import ADD_LIKE from "../mutations/addLike"
import GET_CURRENT_USER from "../queries/getCurrentUser"
import Error from "./Error"

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1)
}

const handleLike = (props, addLikeFunc, isAuth) => {
    if(isAuth){
        addLikeFunc({
            variables: {
                recipeId: props.match.params.id
            }
        }).catch(e => {
            console.log(e)
        })
    } else {
        props.history.push('/signin')
    }
}

// const updateUI = (cache, {data: {addLike}}, props) => {
//     const {getRecipe} = cache.readQuery({query: FETCH_RECIPE, variables: {recipeId: props.match.params.id}})

//     cache.writeQuery({
//         query: FETCH_RECIPE, 
//         variables: {recipeId: props.match.params.id},
//         data: {
//             getRecipe: {
//                 ...getRecipe,
//                 likes: getRecipe.likes + 1
//             }
//         }
//     })
//     console.log(getRecipe)
//     // console.log(addLike)
// }

const RecipeItem = (props) => (
    <div className="recipe">
        <div className="container">
            <div className="row center-xs">
                <Query query={FETCH_RECIPE} variables={{recipeId: props.match.params.id}}>
                    {({loading, data, error}) => {
                        if(loading) return <p>Loading</p>
                        if(error) return <p>Error</p>

                        const {getRecipe} = data
                        return (
                            <Query query={GET_CURRENT_USER}>
                                {({data, loading}) => {
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
                                                    <button className="btn btn--primary" onClick={() => handleLike(props, addLike, data.getCurrentUser)}>Like</button>
                                                    {error && <Error errors={error.graphQLErrors} />}
                                                </div>
                                            )
                                        }}
                                        </Mutation>
                                    )
                                }}
                            </Query>
                        )
                    }}
                </Query>
            </div>
        </div>
    </div>
)

export default RecipeItem