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
        },
        getCurrentUser: async (obj, args, {currentUser, User}) => {
            try {
                if(!currentUser) return null
                const currUser = await User.findOne({username: currentUser.username})
                console.log(currUser)
                return currUser
            } catch(e){
                console.log(e)
            }
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
        },
        addLike: async (obj, {recipeId}, {currentUser, User, Recipe}) => {
            try {
                const currUser = await User.findOne({username: currentUser.username})
                if(!currUser) throw new Error("User doesn't exist")
                
                if(currUser.favourites.length === 0) {
                    const favouriteIds = [...currUser.favourites, recipeId._id]
                    await User.findOneAndUpdate({username: currentUser.username}, {favourites: favouriteIds}, {new: true}) 
                    await Recipe.findByIdAndUpdate(recipeId._id, {$inc: {"likes": 1}}, {new: true}).exec();
                    return await User.findOne({username: currentUser.username})
                } else {
                    const favouriteExists = currUser.favourites.find(favourite => {
                        const parsedId = JSON.parse(JSON.stringify(favourite))
                        return parsedId === recipeId._id
                    })

                    if(favouriteExists) throw new Error("User has already favourited this recipe")

                    const favouriteIds = [...currUser.favourites, recipeId._id]
                    await User.findOneAndUpdate({username: currentUser.username}, {favourites: favouriteIds}, {new: true}) 
                    await Recipe.findByIdAndUpdate(recipeId._id, {$inc: {"likes": 1}}, {new: true}).exec();
                    return await User.findOne({username: currentUser.username})
                }
            } catch(e){
                console.log(e)
                return e
            }
        }
    },
    User: {
        favourites: async (obj, args, {Recipe}) => {
            const favouritesIds = obj.favourites;
            const favouritesArr = [];

            for(let favourite in favouritesIds){
                const recipe = await Recipe.findById(favouritesIds[favourite])
                favouritesArr.push(recipe)
                console.log(favouritesArr)
            }
            return favouritesArr
        }
    }
}