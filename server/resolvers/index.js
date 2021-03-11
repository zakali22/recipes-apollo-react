const jwt = require("jsonwebtoken")

const createUserToken = (user, secret, expiresIn) => {
    const {username, email} = user
    return jwt.sign({username, email}, secret, {expiresIn})
}

exports.resolvers = {
    Query: {
        getAllRecipes: async (obj, args, {Recipe}) => { // Use async/await for any mongoose requests
            return await Recipe.find({})
        }
    },

    Mutation: {
        addRecipe: async (obj, {recipe}, {Recipe}) => {
            try {
                await new Recipe({
                    ...recipe
                }).save();

                return await Recipe.find({})
            } catch(e){
                return e
            }
        },
        signupUser: async (obj, {username, email, password}, {User}) => {
            try {
                const user = User.findOne({username})
                if(user){
                    throw new Error("User already exists")
                }

                const newUser = new User({
                    username, 
                    email,
                    password
                }).save();

                return {
                    token: createUserToken(newUser, process.env.SECRET, '1hr')
                }

            } catch(e){
                return e
            }
        }
    }
}