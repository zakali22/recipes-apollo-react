import {gql} from "apollo-boost"

export default gql`
    mutation deleteUserRecipe($recipeId: ID){
        deleteUserRecipe(recipeId: {_id: $recipeId}){
            _id
            username
            favourites {
                _id
                name
                description
                instructions
                category
            }   
        }
    }
`