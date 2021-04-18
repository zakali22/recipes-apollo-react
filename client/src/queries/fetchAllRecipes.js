import {gql} from "apollo-boost"

export default gql`
    query {
        getAllRecipes {
            _id
            name
            imageUrl
            description
            category
            likes
            createdAt
            updatedAt
        }
    }
`