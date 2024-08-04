const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User=require('../models/Users')
const {all} = require("express/lib/application");
const {getUserComments, addComment}=require('../controllers/commentController');
const router = express.Router();

router.post('/:id', addComment);
router.get('/',getUserComments);



module.exports = router;

