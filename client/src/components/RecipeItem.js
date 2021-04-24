import React from "react"
import {Query, Mutation, useQuery} from "react-apollo"
import FETCH_RECIPE from "../queries/fetchRecipe"
import ADD_LIKE from "../mutations/addLike"
import DELETE_LIKE from "../mutations/deleteLike"
import GET_CURRENT_USER from "../queries/getCurrentUser"
import Error from "./Error"

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1)
}

const RecipeItem = (props) => {
    const [isLike, setIsLike] = React.useState(false)
    const { loading, error, data } = useQuery(GET_CURRENT_USER);

    React.useEffect(() => {
        if(data && data.getCurrentUser) {
            console.log(data)
            const {getCurrentUser: {favourites}} = data
            const isFavourited = favourited(data.getCurrentUser.favourites)
            if(isFavourited) setIsLike(favourited(favourites))
        }
    }, [])

    const favourited = (favourites) => {
        return favourites.find(fav => {
            if(fav) return fav._id === props.match.params.id
        })
    }

    const handleLike = (props, addLikeFunc, deleteLikeFunc, isAuth, recipe) => {
        if(isAuth){
            if(!isLike){
                setIsLike(true)
                addLikeFunc({
                    variables: {
                        recipeId: props.match.params.id
                    },
                    optimisticResponse: {
                        __typename: "Mutation",
                        addLike: {
                            __typename: "Recipe",
                            ...recipe,
                            likes: recipe.likes + 1
                        }
                    },
                    update: (store, {data: {addLike}}) => {
                        const {getRecipe} = store.readQuery({query: FETCH_RECIPE, variables: {recipeId: props.match.params.id}})
                        const newRecipe = {
                            ...getRecipe,
                            likes: addLike.likes
                        }
                        console.log(addLike)
                        store.writeQuery({
                            query: FETCH_RECIPE, 
                            variables: {recipeId: props.match.params.id},
                            data: {
                                getRecipe: {
                                    ...newRecipe
                                }
                            }
                        })
                    }
                }).then(res => {
                    console.log(res)
                }).catch(e => {
                    console.log(e)
                })
            } else {
                setIsLike(false)
                deleteLikeFunc({
                    variables: {
                        recipeId: props.match.params.id
                    },
                    optimisticResponse: {
                        __typename: "Mutation",
                        addLike: {
                            __typename: "Recipe",
                            ...recipe,
                            likes: recipe.likes - 1
                        }
                    },
                    update: (store, {data: {deleteLike}}) => {
                        const {getRecipe} = store.readQuery({query: FETCH_RECIPE, variables: {recipeId: props.match.params.id}})
                        const newRecipe = {
                            ...getRecipe,
                            likes: deleteLike.likes
                        }
                        store.writeQuery({
                            query: FETCH_RECIPE, 
                            variables: {recipeId: props.match.params.id},
                            data: {
                                getRecipe: {
                                    ...newRecipe
                                }
                            }
                        })
                    }
                }).then(res => {
                    console.log(res)
                }).catch(e => {
                    console.log(e)
                })
            }
        } else {
            props.history.push('/signin')
        }
    }


    return (
        <div className="recipe">
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
                                            <Mutation mutation={DELETE_LIKE}>
                                            {(deleteLike, {error}) => (
                                                <>
                                                <div className="recipe__header" style={{backgroundImage: `url(${getRecipe.imageUrl})`}}></div>
                                                <div className="recipe__details">
                                                    <div className="recipe__details-meta">
                                                        <div className="container">
                                                            <div className="row">
                                                                <h1 className="recipe__details-title title">{getRecipe.name}</h1>
                                                                <span className={`recipe-category ${getRecipe.category}`}>{getRecipe.category}</span>
                                                                <p>Created by: <strong>{capitalize(getRecipe.createdBy.username)}</strong></p>
                                                                <p>{getRecipe.likes} 💗 </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="recipe__details-desc">
                                                        <p>{getRecipe.description}</p>
                                                    </div>
                                                    <div className="recipe__details-instructions">
                                                        <div className="container">
                                                            <div className="row">
                                                                <h3 className="sub-title">Instructions</h3>
                                                                <div dangerouslySetInnerHTML={{
                                                                    __html: getRecipe.instructions
                                                                }}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn--primary recipe__details-like" onClick={() => handleLike(props, addLike, deleteLike, data.getCurrentUser, getRecipe)}>{!isLike ? 'Like' : 'Unlike'}</button>
                                                    {error && <Error errors={error.graphQLErrors} />}
                                                </div>
                                                </>
                                            )}
                                            </Mutation>
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
    )
}

export default RecipeItem