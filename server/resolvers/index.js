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
        getRecipe: async (obj, {recipeId}, {Recipe}) => {
            return await Recipe.findOne({_id: recipeId._id})
        },
        getAllUsers: async(obj, args, {User}) => {
            return await User.find({})
        },
        getCurrentUser: async (obj, args, {currentUser, User}) => {
            try {
                if(!currentUser) return null
                const currUser = await User.findOne({username: currentUser.username})

                return currUser
            } catch(e){
                console.log(e)
            }
        },
        getCurrentUserRecipes: async (obj, args, {User, Recipe, currentUser}) => {
            try {
                if(!currentUser) return null;
                const {_id} = await User.findOne({username: currentUser.username})

                const recipes = await Recipe.find({createdBy: _id}).sort({likes: "desc", createdAt: "desc"})
     
                return recipes
            } catch(e){
                console.log(e)
            }
        },
        searchRecipe: async (obj, {searchTerm}, {Recipe}) => {
            if(searchTerm.text) {
                let res;
                res = await Recipe.find({$text: {$search: searchTerm.text}}, {score: {$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}})
    
     
                return res 
            } else {
                return await Recipe.find().sort({likes: "desc", createdAt: "desc"})
            }
        },
    },

    Mutation: {
        addRecipe: async (obj, {recipe}, {Recipe, currentUser, User}) => {
            try {
                if(currentUser) {
                    const user = await User.findOne({username: currentUser.username})
                    const newRecipe = await new Recipe({
                        ...recipe,
                        createdBy: user._id
                    }).save();

                    return newRecipe
                }

                throw new Error("Please login to add a recipe")
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
                
                // if(currUser.favourites.length === 0) {
                    const favouriteIds = [...currUser.favourites, recipeId._id]
                    await User.findOneAndUpdate({username: currentUser.username}, {favourites: favouriteIds}, {new: true}) 
                    await Recipe.findByIdAndUpdate(recipeId._id, {$inc: {"likes": 1}}, {new: true}).exec();
                    return await Recipe.findOne({_id: recipeId._id})
                // } else {
                //     const favouriteExists = currUser.favourites.find(favourite => {
                //         const parsedId = JSON.parse(JSON.stringify(favourite))
                //         return parsedId === recipeId._id
                //     })

                //     if(favouriteExists) throw new Error("User has already favourited this recipe")

                //     const favouriteIds = [...currUser.favourites, recipeId._id]
                //     await User.findOneAndUpdate({username: currentUser.username}, {favourites: favouriteIds}, {new: true}) 
                //     await Recipe.findByIdAndUpdate(recipeId._id, {$inc: {"likes": 1}}, {new: true}).exec();
                //     return await Recipe.findOne({_id: recipeId._id})
                // }
            } catch(e){
                console.log(e)
                return e
            }
        },
        deleteLike: async (obj, {recipeId}, {currentUser, User, Recipe}) => {
            try {
                const currUser = await User.findOne({username: currentUser.username})
                if(!currUser) throw new Error("User doesn't exist")

                const filteredFav = currUser.favourites.filter(favourite => {
                    const parsedId = JSON.parse(JSON.stringify(favourite._id))
                    return parsedId !== recipeId._id
                })

                await User.findOneAndUpdate({username: currentUser.username}, {favourites: filteredFav}).exec();
                await Recipe.findByIdAndUpdate(recipeId._id, {$inc: {"likes": -1}, }, {new: true}).exec();

                return await Recipe.findOne({_id: recipeId._id})
            } catch(e){
                console.log(e)
                return e
            }
        },
        deleteUserRecipe: async (obj, {recipeId}, {User, Recipe, currentUser}) => {
            try {
                if(!currentUser) return null;
                const currUser = await User.findOne({username: currentUser.username})
                const userFav = currUser.favourites.filter(fav => fav._id !== recipeId._id)
                console.log(currUser.favourites)

                await User.findOneAndUpdate({username: currentUser.username}, {favourites: userFav}, {new: true, useFindAndModify: false}).exec();
                await Recipe.findOneAndDelete({_id: recipeId._id}).exec();

                return currUser
            } catch(e){
                console.log(e)
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

            }
            return favouritesArr
        }
    },
    Recipe: {
        createdBy: async (obj, args, {User}) => {  
            try {
                const userId = obj.createdBy
                const user = await User.findOne({_id: userId})
                return user
            } catch(e){
                console.log(e)
            }
        }
    }
}