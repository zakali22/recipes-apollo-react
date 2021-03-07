const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('Recipe', RecipeSchema)