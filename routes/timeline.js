const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/Users');
const{getTimelinePosts}=require('../controllers/postController')

router.get('/', getTimelinePosts);

module.exports = router;

