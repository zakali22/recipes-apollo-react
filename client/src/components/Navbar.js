import React, {Fragment} from "react"
import {NavLink} from "react-router-dom"
import withSession from "./HOC/withSession"
import Signout from "./Signout"

const Navbar = ({session}) => {
    // console.log(props)
    return (
        <nav className="nav">
            <div className="container">
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/search">Search</NavLink></li>
                    {session && session.getCurrentUser ? (
                        <Fragment>
                            <li><NavLink to="/recipes/add">Add recipe</NavLink></li>
                            <li><NavLink to="/profile">Profile</NavLink></li>
                            <Signout />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <li><NavLink to="/signin">Signin</NavLink></li>
                            <li><NavLink to="/signup">Signup</NavLink></li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </nav>
    )

}

export default withSession(Navbar)