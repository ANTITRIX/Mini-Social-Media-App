const express = require('express');
const sequelize = require('./db').sequelize;
const db = require('./db');
const session=require('express-session')
const profileRoute=require('./routes/profile')
const User = require('./models/Users'); // Adjust the path as needed
const bcrypt=require('bcrypt');
const { passwordStrength } = require('check-password-strength')
const expressLayouts=require('express-ejs-layouts');
const bodyParser = require('body-parser');
const login=require('./routes/signin')
const cookieParser=require('cookie-parser')
const methodOverride=require('method-override')
const path=require('path')
const post=require('./routes/post')
const getAllPosts=require('./routes/getAllPosts')
const updatepost=require('./routes/updatePost');
const deletePost=require('./routes/postDelete');
const timeline=require('./routes/timeline');
const addComment=require('./routes/comment');
const Comment = require("./models/Comment");
const updateComment=require('./routes/updatComment');
const deleteComment=require('./routes/deleteComment');
const mailgunController = require("./controllers/mailgunController");
const resetPassword=require('./routes/resetPassword');

require('dotenv').config()
const message=''




const app = express();
require('dotenv').config();

app.use(methodOverride('_method'));
app.use(methodOverride('_method', { methods: ['PATCH', 'POST'] }));
app.use(express.json()); // Middleware to parse JSON requests
app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For parsing JSON data (optional)
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));
app.use(cookieParser())
app.use(
    session({
        resave : false,
        saveUninitialized : false,
        secret : 'your-secret-key',
        cookie : {
            secure : false,
        }
    })
)



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.static('public'));
app.use('/login',login);
// View engine setup
app.set('view engine', 'ejs');

app.get('/createUser', (req, res) => {
    res.render('signup',{ message });
});
app.use('/profile',profileRoute);
app.use('/create-post',post);
app.use('/user-posts',getAllPosts)
app.use('/update-post', updatepost);
app.use('/delete-post',deletePost);
app.use('/timeline',timeline);
app.use('/add-comment',addComment);
app.use('/update-comment',updateComment);
app.use('/delete-comment',deleteComment);
app.use("/api", mailgunController);
app.use('/reset-password',resetPassword);
app.get('/', (req, res) => {
    res.render('home');
});




// Create a new user
const { body, validationResult } = require('express-validator');
app.post('/createUser', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
],async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('signup',{message:"validation failed ! , please try again later"});
            res.redirect('/')
        }
        const { email, password, name, address, phone, age } = req.body;
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);
        const count = await User.count({
            where: { email: email },
        });
        let passwordStrngth=passwordStrength(password).id;
        if(passwordStrngth===0 || passwordStrngth===1||passwordStrngth===2){
            return res.send("password is weak ! , try with a stronger password");
        }
        else if(count>0){
            const message = "This email already has an account!";
            return res.render('signup', { message });
        }
            const newUser = await User.create({
                email,
                password:hashedPassword,
                name,
                address,
                phone,
                age
            });


           return  res.redirect('/login');


    } catch (error) {

    }
});
app.get('/allComments', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }

    const userId = req.session.user.id;
    try {
        const allComments = await Comment.findAll({
            where: { userId },
            include: {
                model: User,
                attributes: ['name']
            }
        });
        res.render('getComments', { comments: allComments });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});
console.log("Mailgun API Key:", process.env.MAILGUN_API_KEY);
console.log("Mailgun Domain:", process.env.MAILGUN_DOMAIN);


// Start your Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

