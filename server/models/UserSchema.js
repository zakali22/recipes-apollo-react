const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

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

// Hash password before saving to DB
UserSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next()
    }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) return next(err)

            this.password = hash; // save hashed version to user's password property
            next();
        })
    })
})


module.exports = mongoose.model('User', UserSchema)