import React from "react"
import withSession from "./HOC/withSession"
import UserRecipes from "./UserRecipes"
import {Link} from "react-router-dom"

const Profile = ({session}) => {

    console.log(session)
    return (
        <div className="profile container">
            { session && session.getCurrentUser && (
                <>
                <h2><i>User info</i></h2>
                <div className="profile__details">
                    <p><strong>Username</strong>: {session.getCurrentUser.username}</p>
                    <p><strong>Email</strong>: {session.getCurrentUser.email}</p>
                </div>

                <h2><i>{session.getCurrentUser.username}'s favourites</i></h2>
                <div className="profile__details">
                    { 
                        session && session.getCurrentUser.favourites.length ? (
                            session.getCurrentUser.favourites.map(recipe => (
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

                <h2><i>{session.getCurrentUser.username}'s recipes created</i></h2>
                <UserRecipes />
                </>
            )}
        </div>
    )
}

export default withSession(Profile)