const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

const Feedback = require('../models/feedback');

//landing page
router.get('/', (req,res)=>{
    res.render('index');
})

//welcome page
router.get('/welcome', (req,res)=>{
    res.render('welcome');
})

//dashboard
router.get('/dashboard', (req,res)=>{
    res.render('dashboard',{
        name: req.user.name,
        plan: req.user.plan
    });
})

//adding feedback to database
router.post('/feedback', (req,res) =>{
    const {
        name,email,find_us,message
    } = req.body;
    const newFeed = new Feedback({
        name,
        email,
        find_us,
        message
    });
    newFeed.save()
    .then(feed=>{
        req.flash('success_msg', 'Feedback Received');
        res.render('index');
    })
    .catch(err=> console.log(err));
});

module.exports = router;