import {gql} from "apollo-boost"

export const RECIPE_FRAGMENT = gql`
    fragment recipeFields on Recipe {
        _id
        name
        imageUrl
        description
        category
        likes
        createdAt
        updatedAt 
    }
`