import {gql} from "apollo-boost"

export default gql`
    mutation signinUser($username: String!, $password: String!){
        signinUser(user: {username: $username, password: $password}){
            token
        }
    }
`