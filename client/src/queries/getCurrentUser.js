import {gql} from "apollo-boost"

export default gql`
    query {
        getCurrentUser {
            _id
            username
            email
            favourites {
                _id
                name
            }
        }
    }

`