import {gql} from "apollo-boost"

export default gql`
    mutation searchRecipe($searchTerm: String){
        searchRecipe(searchTerm: {text: $searchTerm}){
            _id
            name
            description
            instructions
            category
            likes
        }
    }
`