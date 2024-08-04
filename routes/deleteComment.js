const express = require('express');
const Comment = require('../models/Comment');
const {deleteComment}=require('../controllers/commentController')
const router = express.Router();

// Route to handle the deletion of a comment
router.post('/:id', deleteComment);

module.exports = router;
