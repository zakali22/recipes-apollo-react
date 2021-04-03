import React from "react"
import {ApolloConsumer} from "react-apollo"
import {withRouter} from "react-router-dom"

const handleSignout = async (client, history) => {
    localStorage.removeItem("token")
    await client.resetStore(); // Use await, otherwise it will cause an error
    console.log(client)
    history.push('/')
}

const Signout = (props) => {
    return (
        <ApolloConsumer>
            {(client) => {
                return <button className="btn btn--primary" onClick={() => handleSignout(client, props.history)}>Signout</button>
            }}
        </ApolloConsumer>
    )
}

export default withRouter(Signout)