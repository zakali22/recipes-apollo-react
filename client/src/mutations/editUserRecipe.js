import {gql} from "apollo-boost"

export default gql`
    mutation editUserRecipe($recipeId: ID, $name: String, $imageUrl: String, $description: String, $instructions: String, $category: String){
        editUserRecipe(recipe: {_id: $recipeId, name: $name, imageUrl: $imageUrl, description: $description, instructions: $instructions, category: $category}){
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