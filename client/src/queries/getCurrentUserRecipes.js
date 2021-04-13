import {gql} from "apollo-boost"

export default gql`
    query {
        getCurrentUserRecipes {
            _id
            name
        }
    }
`