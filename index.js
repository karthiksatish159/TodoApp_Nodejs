const express=require('express');
const bodyparser=require('body-parser');
const passport=require('passport');
const db=require('./setup/myUrls').mongoDBurl;
const mongoose=require('mongoose');
const cors=require('cors')
const app=express();
const nodemailer = require('nodemailer');
const auth=require('./routes/public/auth');
const todo=require('./routes/public/crud');
const port=process.env.PORT||4000;
const ejs=require('ejs');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
}))
//So here we are calling the views directory
app.set('views',__dirname+"/"+"views");
app.set('view engine','ejs');
//Attempt to connect database
mongoose.connect(db,{useNewUrlParser: true})
.then(()=>console.log('MongoDB successfully connected'))
.catch(err=>console.log(err));
app.use(passport.initialize());
require("./strategies/jwtstrategy")(passport);
app.get("/",(req,res)=>
{
    res.send("Hello word");
})
//routes
app.use('/auth',auth);
app.use('/todo',todo);
app.post('/post_name',(req,res)=>
{
    let {name}=req.body
    console.log(name);
})
app.listen(port,()=>console.log(`The server is running on ${port}`));