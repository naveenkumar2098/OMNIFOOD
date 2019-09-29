const express = require('express');
const port = 8080;
const path = require('path');
const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(port,(err)=>{
    if(err){
        console.log(`Error encountered while running server ${err}`);
    }
    console.log(`server is running perfectly on port`);
})