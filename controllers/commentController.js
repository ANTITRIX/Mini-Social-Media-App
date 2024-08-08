const comment=require('../models/Comment')
const Comment = require("../models/Comment");
const User = require("../models/Users");
const getUserComments = async (req,res)=>{
    const userId=req.session.user.id;
    const allComments=await Comment.findOne({
        where:{userId},
        include : User
    })
    res.render('getComments',allComments);
}
const addComment= async (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    try {
        const { comment } = req.body;
        const userId = req.session.user.id;
        const postId = req.params.id;
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const timestamp = `${year}-${month}-${day}`;


        const newComment = await Comment.create({
            content: comment,
            timestamp,
            userId,
            postId
        });
        res.redirect('/timeline');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
const deleteComment=async (req, res) => {
    const commentId = req.params.id;

    try {
        await Comment.destroy({
            where: { id: commentId }
        });

        res.redirect('/timeline');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {
    getUserComments,
    addComment,
    deleteComment
};
