const User = require('../models/Users');
const bcrypt=require('bcrypt')

let message = "";

const renderSignin = (req, res) => {
    res.render('signin', { message });
};

const handleSignin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    try {
        const user = await User.findOne({ where: { email } });
        const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);

        if (!user) {
           // message = "This email does not have an associated account.";
            return res.render('signin', { message: "This email does not have an associated account.\"" });
        }
        if (isPasswordMatch) {
            // Passwords match
            req.session.isAuth = true;
            req.session.user = user;
            req.session.save(() => {
                res.redirect('/timeline');
            });
        }
        else{
           // message = "Authentication failed. Please check your credentials.";
            return res.render('signin', { message :"Authentication failed. Please check your credentials." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const renderProfile = (req, res) => {
    if (req.session.user) {
        res.render('profile', req.session);
    } else {
        res.redirect('/login');
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { name, address, phone, age } = req.body;
        const userEmail = req.session.user.email;

        await User.update(
            {
                name,
                address,
                phone,
                age,
            },
            {
                where: { email: userEmail },
            }
        );

        const updatedUser = await User.findOne({ where: { email: userEmail } });
        req.session.user = updatedUser;
        await req.session.save(); // Save the session

        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile. Please try again later.' });
    }
};


module.exports = {
    renderSignin,
    handleSignin,
    renderProfile,
    updateUserProfile
};

