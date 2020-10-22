const { Router } = require("express");

const UserModel = require('../models/userModel');

const router = Router();


router.get('/users', async (req, res) => {
    let allUsers = await UserModel.find({});

    res.send(allUsers);
});

router.post('/users/create', async(req, res) => {
    let {name, email, age, phoneNumber, password} = req.body;

    if (!name || !email || !age || !password) {
        res.send('missing info');
        return;
     }

    if (await UserModel.checkDups(email, phoneNumber)) {
        res.send('A user with this email or phone number already exists');
        return;
    }

    let hashedpassword = await UserModel.hashPassword(password);

    let user = new UserModel({
        name,
        email,
        age,
        phoneNumber,
        password: hashedpassword
    })

    user.save();

    res.send('user created');
})



module.exports = router;