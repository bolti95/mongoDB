const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');


const app = express();

const router = require('./routes/router');

const UserModel = require('./models/userModel');

mongoose.connect('mongodb+srv://Izzy:apple@cluster0.pkotb.azure.mongodb.net/signup?retryWrites=true&w=majority'), {
    userNewUrlParser: true,
    useUnifiedTopology: true
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', router);
 
// let user = new UserModel ({
//     name: 'Sam',
//     age: '27',
//     email: 'sam.@gmail.com',
//     phoneNumber: '7777'
// });

// user.save(); adding users to the database, keeps saving new users to the data base. You can comment that out when you are finished adding new users and focus on retrieving data to Mongo DB , which sends the data over. 
//whatever is in user, will try to save that to the database every time 

// const getUsers = async() => {
//     let allUsers  = await UserModel.find({})
//     console.log(allUsers);
// }
//your code here

const getUsers = async() =>{
    let allUsers = await UserModel.find({});
    console.log(allUsers);
}

getUsers();

app.listen(3000, () => {
    console.log('listening on port 3000');
})
// save(allUsers);

