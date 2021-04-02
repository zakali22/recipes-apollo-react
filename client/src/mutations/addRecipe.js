import {gql} from "apollo-boost"

export default gql`
    mutation addRecipe($name: String!, $description: String!, $instructions: String!, $category: String!){
        addRecipe(recipe: {name: $name, description: $description, instructions: $instructions, category: $category}){
            _id
            name
            description
            instructions
            category
            createdBy {
                _id
                username
                email
            }
        }
    }
`