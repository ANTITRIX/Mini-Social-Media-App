const express = require('express');
const router = express.Router();
const User=require('../models/Users');
const Post=require('../models/Post');
const {getUserPosts}=require('../controllers/postController');

router.get('/', getUserPosts);

module.exports = router;
