import {gql} from "apollo-boost"

export default gql`
    query searchRecipe($searchTerm: String){
        searchRecipe(searchTerm: {text: $searchTerm}){
            _id
            name
            imageUrl
            description
            instructions
            category
            likes
        }
    }
`