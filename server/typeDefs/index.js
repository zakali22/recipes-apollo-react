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

    type Token {
        token: String!
    }

    # Input types

    input UserInput {
        username: String!
        email: String!
        password: String!
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
        getAllUsers: [User]
    }

    type Mutation {
        addRecipe(recipe: RecipeInput): [Recipe]
        signupUser(user: UserInput): Token
    }

`;