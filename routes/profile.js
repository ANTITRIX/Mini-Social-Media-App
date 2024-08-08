const express=require('express');
const User = require('../models/Users');
const router=express.Router();
const {renderProfile, updateUserProfile}=require('../controllers/authControllers')





router.get('/' ,renderProfile)
router.post('/', async (req, res) => {
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
        req.session.user=await User.findOne({where:{email:userEmail}})
        res.redirect('/timeline')
    } catch (error) {
        console.log('req body : ')
        console.log(req.body)
        console.log('session :')
        console.log(req.session)
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile. Please try again later.' });

    }
});
module.exports=router;



















module.exports=router;
