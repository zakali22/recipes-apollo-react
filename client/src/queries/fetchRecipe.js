import {gql} from "apollo-boost"

export default gql`
    query getRecipe($recipeId: ID!){
        getRecipe(recipeId: {_id: $recipeId}){
            _id
            name
            imageUrl
            instructions
            description
            category
            likes
            createdAt
            updatedAt
            createdBy {
                _id
                username
            }
        }
    }
`