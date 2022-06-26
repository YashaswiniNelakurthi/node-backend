const User = require('../models/user');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    User.findOne({email}).exec((err, user)=>{
        if(err){
            res.json({ 'success': `User ${email} is not logged in!` });
        } else if(!user){
            res.json({ 'success': `User ${email} is not logged in!` });
        } else {
            res.json({ 'success': `User ${user} is logged in!` });
        }
    });
    // if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    // console.log('foundUser', foundUser);
    // const match = await bcrypt.compare(password, foundUser.password);
    // if (foundUser) {
        // create JWTs
        // res.json({ 'success': `User ${email} is logged in!` });
    // } else {
    //     res.sendStatus(401);
    // }
}

module.exports = { handleLogin };