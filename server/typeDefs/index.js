exports.typeDefs =  `

    type User {
        _id: ID
        username: String! @unique
        email: String! @unique
        password: String!
        favourites: [Recipe]
        createdAt: String
        updatedAt: String
    }

    type Recipe {
        _id: ID
        name: String!
        description: String!
        category: String!
        likes: Int
        createdAt: String
        updatedAt: String
    }

    # Input types

    input UserInput {
        username: String!
        email: String! @constraint(format: "email")
        password: String! @constraint(minLength: 5, pattern: "^[0-9a-zA-Z]*$")
    }

    input RecipeInput {
        _id: ID
        name: String!
        description: String!
        category: String!
        likes: Int
    }

    type Query {
        getAllRecipes: [Recipe]
    }

    type Mutation {
        addRecipe(recipe: RecipeInput): [Recipe]
    }

`;