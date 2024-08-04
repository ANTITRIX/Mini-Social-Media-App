const express=require('express');
const router=express.Router();
const Post=require('../models/Post')
const{renderPostPage, createNewPost}=require('../controllers/postController');
router.get('/',renderPostPage);

router.post('/',createNewPost);





module.exports=router;