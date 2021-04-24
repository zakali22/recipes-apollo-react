import React from "react"
import withAuth from "./HOC/withAuth"
import UserRecipes from "./UserRecipes"
import {Link} from "react-router-dom"
import RecipeCard from "./RecipeCard"

const Profile = ({auth}) => {

    const favouritesLength = (favouritesArr) => {
        const arr = favouritesArr.filter(fav => fav)
        return arr.length === 1
    }

    return (
        <div className="profile">
            { auth && auth.getCurrentUser && (
                <>
                <div className="profile__info">
                    <div className="container">
                        <h2 className="profile__info-title sub-title">User info</h2>
                        <div className="profile__details">
                            <p><strong>Username</strong>: {auth.getCurrentUser.username}</p>
                            <p><strong>Email</strong>: {auth.getCurrentUser.email}</p>
                        </div>
                    </div>
                </div>

                <div className="profile__recipes">
                    <div className="container">
                        <h2 className="sub-title">{auth.getCurrentUser.username}'s favourites</h2>
                        { 
                            auth.getCurrentUser.favourites.length > 0 ? (
                                auth.getCurrentUser.favourites.map(recipe => (
                                    recipe && (
                                        // <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="profile__details-favourites listing__item">
                                             <RecipeCard recipe={recipe} key={recipe._id} isSingle={favouritesLength(auth.getCurrentUser.favourites)}/>
                                        // </Link>
                                    )
                                ))
                            ) : (
                                <p>There are no favourited recipes</p>
                            )
                        }
                    </div>
                </div>

                <div className="profile__recipes">
                    <div className="container">
                        <h2 className="sub-title">{auth.getCurrentUser.username}'s recipes created</h2>
                        <UserRecipes />
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

export default withAuth(Profile)