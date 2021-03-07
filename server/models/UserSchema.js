const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    favourites: {
        type: [Schema.Types.ObjectId], // An array of Recipe Ids
        ref: 'Recipe'
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)