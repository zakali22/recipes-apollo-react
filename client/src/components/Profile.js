import React from "react"
import withSession from "./HOC/withSession"

const Profile = ({session}) => (
    <div className="container">
        { session && session.getCurrentUser && <h3>Welcome, {session.getCurrentUser.username}</h3> }
    </div>
)

export default withSession(Profile)