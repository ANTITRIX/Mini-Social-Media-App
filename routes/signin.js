const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const {renderSignin,handleSignin} = require('../controllers/authControllers');
let message=''
router.get('/',renderSignin);
router.post('/',handleSignin);
module.exports=router;
