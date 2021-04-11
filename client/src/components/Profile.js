import React from "react"
import withAuth from "./HOC/withAuth"
import UserRecipes from "./UserRecipes"
import {Link} from "react-router-dom"

const Profile = ({auth}) => {

    console.log(auth)
    return (
        <div className="profile container">
            { auth && auth.getCurrentUser && (
                <>
                <h2><i>User info</i></h2>
                <div className="profile__details">
                    <p><strong>Username</strong>: {auth.getCurrentUser.username}</p>
                    <p><strong>Email</strong>: {auth.getCurrentUser.email}</p>
                </div>

                <h2><i>{auth.getCurrentUser.username}'s favourites</i></h2>
                <div className="profile__details">
                    { 
                        auth.getCurrentUser.favourites.length > 0 ? (
                            auth.getCurrentUser.favourites.map(recipe => (
                                recipe && (
                                    <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="profile__details-favourites listing__item">
                                        <p>{recipe.name}</p>
                                    </Link>
                                )
                            ))
                        ) : (
                            <p>There are no favourited recipes</p>
                        )
                    }
                </div>

                <h2><i>{auth.getCurrentUser.username}'s recipes created</i></h2>
                <UserRecipes />
                </>
            )}
        </div>
    )
}

export default withAuth(Profile)