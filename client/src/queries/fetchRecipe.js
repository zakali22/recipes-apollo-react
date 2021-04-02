import {gql} from "apollo-boost"

export default gql`
    query getRecipe($recipeId: ID!){
        getRecipe(recipeId: {_id: $recipeId}){
            _id
            name
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