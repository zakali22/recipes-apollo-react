import React from "react"
import {Query} from "react-apollo"
import GET_CURRENT_USER from "../../queries/getCurrentUser"
import {Redirect} from "react-router-dom"

const withAuth = Component => props => (
    <Query query={GET_CURRENT_USER}>
        {({data, loading, refetch}) => {
            // if(loading) return null;
            console.log(Component.name)
            if(data && data.getCurrentUser) {
                if(Component.name === "Signin" || Component.name === "Signup") return <Redirect to="/" />
                
                return <Component {...props} refetch={refetch} auth={data} />

            }
            if(Component.name === "Signin" || Component.name === "Signup") return <Component {...props} refetch={refetch} auth={data} />
            return <Redirect to="/signin" />
        }}
    </Query>
)

export default withAuth