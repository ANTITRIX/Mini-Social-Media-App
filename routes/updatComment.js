const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User=require('../models/Users')
const {all} = require("express/lib/application");
const router = express.Router();

router.get('/:id', async (req, res) => {
    const commentId = req.params.id;
    try {
        const comment = await Comment.findOne({
            where: { id: commentId },
            include: {
                model: User,
                attributes: ['name']
            }
        });
        if (!comment) {
            return res.status(404).send('Comment not found');
        }

        res.render('updateComment', { comment });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/:id',async (req,res)=>{
    const id=req.params.id;
    const{content}=req.body;
    try {
        const NewComment = Comment.update({
            content:content,
        }, {where: {id}})
        res.redirect('/allComments')

    }
    catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }


})
router.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    await Comment.destroy({where:{id}});
    res.redirect('/allComments');
})




module.exports=router;