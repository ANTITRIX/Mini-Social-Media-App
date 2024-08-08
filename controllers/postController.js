const User = require('../models/Users');
const Post = require("../models/Post");
const Comment=require('../models/Comment');

const getUserPosts = async (req, res) => {
    const email = req.session.user.email;

    try {
        const user = await User.findOne({
            where: { email },
            include: Post
        });

        if (!user) {
            return res.status(404).send('User not found');
        }
        req.session.post=user.posts;
        res.render('userPosts', { user, posts: user.posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
const renderPostPage = (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    res.render('post');
};

const createNewPost = async (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }

    const userId = req.session.user.id;
    const { content } = req.body;
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const timestamp = `${year}-${month}-${day}`;

    try {
        const newPost = await Post.create({
            content,
            timestamp,
            userId,
        });
        res.redirect('/timeline');
    } catch (error) {
        console.error('Error creating new post:', error);
        res.status(500).json({ message: 'Error creating post. Please try again later.' });
    }
};
const deleteUserPost =async (req, res) => {
    const id = req.params.id;
    try {
        if(!req.session.user)
            return res.redirect('/login');
        const email = req.session.user.email;
        const user = await User.findOne({
            where: { email },
            include: Post
        });
        await Post.destroy({ where: { id } });
        res.redirect('/timeline');
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Error deleting post. Please try again later.' });
    }
};
const getSinglePost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await Post.findOne({ where: { id } });
        if (!post) {
            res.send("No such post!");
            return;
        }
        req.session.post = post;
        res.render('singlePost', req.session);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).send("Internal server error");
    }
};
const updatePostContent = async (req, res) => {
    const id = req.params.id;
    const { content } = req.body;

    try {
        const [updatedRows] = await Post.update(
            { content },
            { where: { id } }
        );
        if (updatedRows > 0) {
            req.session.post = content;
            res.redirect('/timeline')
        } else {
            res.status(404).send('Post not found.');
        }
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send('Internal server error');
    }
};
const getTimelinePosts = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ],
        });

        res.render('timeline', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    getUserPosts,
    renderPostPage,
    createNewPost,
    deleteUserPost,
    getSinglePost,
    updatePostContent,
    getTimelinePosts
};
