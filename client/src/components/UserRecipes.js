import React from "react"
import {Link} from "react-router-dom"
import {Query, Mutation} from "react-apollo"
import GET_CURRENT_USER_RECIPES from "../queries/getCurrentUserRecipes"
import GET_CURRENT_USER from "../queries/getCurrentUser"
import DELETE_USER_RECIPE from "../mutations/deleteUserRecipe"

const handleDelete = (e, deleteUserRecipeFunc, recipeId, getCurrentUserRecipes) => {
    e.preventDefault();
    deleteUserRecipeFunc({
        variables: {
            recipeId
        },
        refetchQueries: [
            {query: GET_CURRENT_USER_RECIPES}
        ],
        update: (store, {data: {deleteUserRecipe}}) => {
            const {getCurrentUser} = store.readQuery({query: GET_CURRENT_USER})
            
            store.writeQuery({
                query: GET_CURRENT_USER,
                data: {
                    getCurrentUser: {
                        ...getCurrentUser,
                        favourites: deleteUserRecipe.favourites
                    }
                }
            })
        }
    })
}

const UserRecipes = () => (
    <Query query={GET_CURRENT_USER_RECIPES} fetchPolicy={'cache-and-network'}>
        {({data, loading, error}) => {
            if(loading) return <p>Loading</p>

            const {getCurrentUserRecipes} = data;
            return (
                <>
                {
                    getCurrentUserRecipes.length > 0 ? (
                        getCurrentUserRecipes.map(recipe => (
                            <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="profile__details-favourites listing__item listing__item--inline">
                                <p>{recipe.name}</p>
                                <Mutation mutation={DELETE_USER_RECIPE}>
                                    {(deleteUserRecipe, {data}) => (
                                        <button className="btn btn--primary" onClick={e => handleDelete(e, deleteUserRecipe, recipe._id, getCurrentUserRecipes)}>Delete</button>
                                    )}
                                </Mutation>
                            </Link>
                        ))
                    ) : (
                        <p>There are no recipes created</p>
                    )
                }
                </>
            )
        }}
    </Query>
)

export default UserRecipes