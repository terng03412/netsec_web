// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Crypto = require('crypto-js')


// define the schema for our user model
var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    var salt = bcrypt.genSaltSync(8);
    return salt + '$' + Crypto.SHA256(salt + password).toString()
};


// checking if password is valid
userSchema.methods.validPassword = function (password) {
    var salt = this.local.password.substring(0, 29);
    var hashpw = this.local.password.substring(30, 93);

    return Crypto.SHA256(salt + password).toString().localeCompare(hashpw);;
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
