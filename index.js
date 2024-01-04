const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const session = require('express-session');

mongoose.connect('mongodb://127.0.0.1:27017/authDemo', {})
    .then(() => {
       console.log("Connected")
    })
    .catch(err => {
        console.log("Failed to connect")
        console.log(err)
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'notsecret',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

const requireLogin = (req, res, next) => {
    if(!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

// ROUTES
app.get('/', (req, res) => {
    res.send('Home page')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const user = new User({username, password})
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if(foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret')
    } 
    else {
        res.redirect('/login')
    }
})

app.post('/logout', (req, res) => {
    // req.session.user_id = null;
    req.session.destroy();
    res.redirect('/login');
})

app.get ('/secret', requireLogin, (req, res) => {
    res.render('secret')
})

app.get('/othersecret', requireLogin, (req, res) => {
    res.send("Other secret")
})
// ROUTES

app.listen(3000, () => {
    console.log("Listening")
})