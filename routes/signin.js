const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const {renderSignin,handleSignin} = require('../controllers/authControllers');
let message=''


/*
router.get('/', (req, res) => {
    res.render('signin',{ message });
});

// Handle login form submission
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            message="this email does not have an associated account.";
            return res.render('signin',{ message });
        }



        if (!(password===user.password)) {
            message="Authentication failed. Please check your credentials.";
            return res.render('signin',{ message });
        } else {
            req.session.isAuth=true;
            req.session.user=user;
            await req.session.save();
            console.log(req.session)
            return res.redirect('/profile')
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
*/

router.get('/',renderSignin);
router.post('/',handleSignin);
module.exports=router;