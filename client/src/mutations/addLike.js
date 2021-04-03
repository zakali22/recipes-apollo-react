import {gql} from "apollo-boost"

export default gql`
    mutation addLike($recipeId: ID){
        addLike(recipeId: {_id: $recipeId}){
            _id
            name
            description
            instructions
            category
            likes
        }
    }
`