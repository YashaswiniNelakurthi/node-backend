const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
// import User from '../models/user';
// const User = "../models/user";

const handleNewUser = async (req, res) => {
    const { first_name, last_name, email, password, club_name } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({email});
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //store the new user
        const objUser = { _id: mongoose.Types.ObjectId(), first_name, last_name, email, password: hashedPwd, club_name };
        
        let newUser = await User.create(objUser)
        console.log(newUser);
        res.status(201).json({
            message: newUser
        }); 
        // .then(result=>{
        //     res.status(201).json({
        //         message: result
        //     });
        // }).catch(err=>{    
        //     res.status(500).json({
        //         message: err
        //     });
        // });        
        // res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
