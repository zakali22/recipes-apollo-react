import React from "react"
import {ApolloConsumer} from "react-apollo"
import {withRouter} from "react-router-dom"

const handleSignout = (client, history) => {
    localStorage.removeItem("token")
    client.resetStore();
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