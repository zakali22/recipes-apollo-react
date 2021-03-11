import {gql} from "apollo-boost"

export default gql`
    query {
        getAllRecipes {
            _id
            name
            description
            category
            likes
            createdAt
            updatedAt
        }
    }
`