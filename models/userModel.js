// Schema is a skeleton for what a document will look like
// shows what is like in a table
//also creates a table itself
const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const user = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: String, required: true},
    phoneNumber: {type: String, required: false, unique: true},
    password: {type: String, required: true}
    
});

user.statics.checkDups = async function(email, phoneNumber) {
    let result= await this.findOne({$or: [{email}, {phoneNumber}]})
    this.find({$or: [{email}, {phoneNumber}]});

    if(result) {
        return true;
    } 
    return false;

}

user.statics.checkExists = async function (email, phoneNumber) {
    const exists = await this.exists({$or: [{email}, {phoneNumber}]});

    return exists;
}

user.statics.hashPassword = async function (password) {
    let hash = await bcrypt.hash(password, 10);

    return hash;
}

user.statics.comparePassword = async function (email, attemptedPassword) {
    let user = this.findOne({email});

    if (!user) {
            return false;
    }

    let result = await bcrypt.compare(attemptedPassword, user.password);

    return result;

}

module.exports = model('users', user); 

/*
Signup 
Password123 -> hfdskjfhdkhksd83y9453 -> store in DB


Login
attempted password -> hash input = hfdskjfhdkhksd83y9453 (compate with one already in DB)

*/