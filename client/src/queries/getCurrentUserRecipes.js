import {gql} from "apollo-boost"
import {RECIPE_FRAGMENT} from "./Fragments/recipeFragment"

export default gql`
    query {
        getCurrentUserRecipes {
            ...recipeFields
        }
    }
    ${RECIPE_FRAGMENT}
`