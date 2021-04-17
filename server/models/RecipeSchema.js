const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    imageUrl: {
       type: String,
       required: true 
    },
    description: {
        type: String,
        required: true
    },
    instructions: {
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
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

RecipeSchema.autoIndex = true;
RecipeSchema.index({name: 'text', category: 'text'})

module.exports = mongoose.model('Recipe', RecipeSchema)