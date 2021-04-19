import React from "react"
import {Link} from "react-router-dom"
import {Query, Mutation} from "react-apollo"
import GET_CURRENT_USER_RECIPES from "../queries/getCurrentUserRecipes"
import GET_CURRENT_USER from "../queries/getCurrentUser"
import UserRecipeCard from "./UserRecipeCard"

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
                        <div className="container">
                            <div className="row">
                                {getCurrentUserRecipes.map(recipe => (
                                    <UserRecipeCard 
                                        recipe={recipe} 
                                        getCurrentUserRecipes={getCurrentUserRecipes} 
                                        handleDelete={handleDelete} 
                                        isSingle={getCurrentUserRecipes.length === 1}
                                    />
                                ))}
                            </div>
                        </div>
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