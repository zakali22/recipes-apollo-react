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
        }
    }
}