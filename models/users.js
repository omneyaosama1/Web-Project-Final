const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    UserName: {
        type: String,
        required: true
    } ,
    Password: {
        type: String,
        required: true
    } ,
    Image: {
        type: String,
        required: false
    } ,
    Type: {
        type: String,
        required: true
    },
    
}, {timestamps: true});

const Users = mongoose.model(userSchema);
module.exports = Users;