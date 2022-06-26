const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.handleLogin);

module.exports = router;

// router.post('signup', (req, res, next)=>{
//     User.find({email: req.body.email}).exec().
//     then((result)=>{
//         if(result.length >= 1){
//             res.status(422).json({
//                 message: 'user already exsisted'
//             })
//         }else {
//             const new_user = new User({
//                 _id: mongoose.Types.ObjectId(),
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name,
//                 email: req.body.email,
//                 password: req.body.password,
//                 address: req.body.address,
//                 course: req.body.course
//             })
        
//             new_user.save().then(result=>{
//                 res.status('200').json({
//                     message: result
//                 });
//             }).catch(err=>{    
//                 res.status('500').json({
//                     message: err
//                 });
//             })
//         }
//     }).catch(err=>{
//         res.status('500').json({
//             message: err
//         });
//     })   
// })

module.exports = router;