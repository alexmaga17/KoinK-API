/**
 * @typedef User
 * @property {string} name.required
 * @property {number} age
 * @property {string} phone
 * @property {string} email.required
 * @property {number} nif
 * @property {string} local
 * @property {string} username.required
 * @property {string} password.required
 */

const mongoose = require('mongoose'); 

const userModel = new mongoose.Schema({
    name:String,
    age:Number,
    phone: Number,
    email: String,
    nif:Number,
    local:String,
    username: String,
    password: String,
})

const user = mongoose.model('utilizador', userModel); 

exports.user = user;