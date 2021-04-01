import {gql} from "apollo-boost"

export default gql`
    mutation SignUp($username: String!, $email: String!, $password: String!){
        signupUser(user: {username: $username, email: $email, password: $password}){
            token
        }
    }
`