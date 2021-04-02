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
        instructions: String!
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
        username: String
        email: String
        password: String
    }

    input RecipeInput {
        _id: ID
        name: String
        description: String
        instructions: String
        category: String
        likes: Int
    }

    type Query {
        getAllRecipes: [Recipe]
        getRecipe(recipeId: RecipeInput): Recipe
        getAllUsers: [User]
        getCurrentUser: User
    }

    type Mutation {
        addRecipe(recipe: RecipeInput): [Recipe]
        signupUser(user: UserInput): Token
        signinUser(user: UserInput): Token
        addLike(recipeId: RecipeInput): User
    }

`;