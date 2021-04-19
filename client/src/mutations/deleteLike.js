import {gql} from "apollo-boost"

export default gql`
    mutation deleteLike($recipeId: ID){
        deleteLike(recipeId: {_id: $recipeId}){
            _id
            name
            description
            instructions
            category
            likes
        }
    }
`