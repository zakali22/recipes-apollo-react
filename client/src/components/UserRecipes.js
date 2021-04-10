import React from "react"
import {Link} from "react-router-dom"
import {Query} from "react-apollo"
import GET_CURRENT_USER_RECIPES from "../queries/getCurrentUserRecipes"

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
                            <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="profile__details-favourites listing__item">
                                <p>{recipe.name}</p>
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