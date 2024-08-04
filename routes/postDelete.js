const express=require('express');
const router=express.Router();
const User=require('../models/Users');
const Post=require('../models/Post');
const{deleteUserPost}=require('../controllers/postController')
router.post('/:id', deleteUserPost);
module.exports=router;