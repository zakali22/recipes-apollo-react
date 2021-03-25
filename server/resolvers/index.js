const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const createUserToken = (user, secret, expiresIn) => {
    const {username, email} = user
    return jwt.sign({username, email}, secret, {expiresIn})
}

exports.resolvers = {
    Query: {
        getAllRecipes: async (obj, args, {Recipe}) => { // Use async/await for any mongoose requests
            return await Recipe.find({})
        },
        getAllUsers: async(obj, args, {User}) => {
            return await User.find({})
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
        signupUser: async (obj, {user}, {User}) => {
            try {
                const {username, email, password} = user;
                const userObj = await User.findOne({username})
                if(userObj){
                    throw new Error("User already exists")
                }

                console.log(username, email, password)

                const newUser = await new User({
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
        },
        signinUser: async (obj, {user: {username, password}}, {User}) => {
            try {
                const user = await User.findOne({username})
                if(!user) throw new Error("User doesn't exist")
                
                const isValidPassword = await bcrypt.compare(password, user.password) // .compare(password passed, user password)
                if(!isValidPassword) throw new Error("Password is invalid")

                return {
                    token: createUserToken(user, process.env.SECRET, '1hr')
                }
            } catch(e){
                return e
            }
        }
    }
}