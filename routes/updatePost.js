const express=require('express');
const Post=require('../models/Post');
const router=express.Router();
const{getSinglePost,updatePostContent}=require('../controllers/postController');

router.get('/:id', getSinglePost);
router.post('/:id', updatePostContent);


module.exports=router;