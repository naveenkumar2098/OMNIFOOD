const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();

//db config
const db = require('./config/keys').MongoURI;

//passport config
require('./config/passport')(passport);

//connect to mongo
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err));

//EJS
// app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//body parser
app.use(express.urlencoded({extended: false}));

//assets
app.use(express.static('assets'));

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global variables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 8080;

app.listen(PORT,(err)=>{
    if(err){
        console.log(`Error encountered while running server ${err}`);
    }
    console.log(`Server Running On ${PORT}`);
})