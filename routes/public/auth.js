const express=require('express');
const bodyparser=require('body-parser');
const passport=require('passport');
const router=express.Router();
const User=require('../../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const key=require('../../setup/myUrls').secreat;
const mongoose=require('mongoose');
var nodemailer = require('nodemailer');
const { redirect } = require('express/lib/response');
router.get('/',(req,res)=>
{
    res.render("index",{message:null,flag:0});
})
router.get('/register',(req,res)=>
{
    res.render('register');
})
router.post('/addUser',(req,res)=>
{
    User.findOne({email:req.body.email})
    .then(person=>
        {
            if(person)
            {
                res.render('index',{message:"The user is already existed",flag:0});
            }
            else
            {
                const newUser=new User(
                    {
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.password
                    })
                    //Now we have to hash the password
                    //For that we have to bcrypt module
                    bcrypt.genSalt(10,(err,slat)=>
                    {
                        bcrypt.hash(newUser.password,slat,(err,hash)=>
                        {
                            if(err)
                            {
                                res.redirect("/");
                            }
                            else
                            {
                                newUser.password=hash;
                                newUser.save()
                                .then(
                                    ()=>
                                    {
                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                              user: 'karthiksatish157@gmail.com',
                                              pass: 'Satishvijji1234+'
                                            }
                                          });
                                          
                                          var mailOptions = {
                                            from: 'karthiksatish157@gmail.com',
                                            to: `${req.body.email}`,
                                            subject: 'Sending Email using Node.js',
                                            text: `Hi My name karthik this my first project in nodejs with crud operations
                                            in this application i implemented the passport strategies for authentication and authorization
                                            And email service with nodemailer and many more,Here i am managing whole session with JWT and cookies`
                                            // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
                                          };
                                          
                                          transporter.sendMail(mailOptions, function(error, info){
                                            if (error) {
                                              console.log(error);
                                            } else {
                                              console.log('Email sent: ' + info.response);
                                            }
                                          });
                                        res.render('index',{message:"Registered successfully",flag:0})
                                    }
                                    )
                                .catch(err=>console.log(err));
                            }
                        })
                    })
            }
        })
    .catch(err=>console.log(err));
  
})
router.get('/login',(req,res)=>
{
    res.render("login");
})
router.post('/verify',(req,res)=>
{
    User.findOne({email:req.body.email})
    .then(person=>
        {
            if(person)
            {
                bcrypt.compare(req.body.password,person.password)
                .then(value=>
                    {
                        if(value)
                        {
                            const payload={
                                id:person.id,
                                email:person.email
                            }
                            jwt.sign(
                                payload,
                                key,
                                {expiresIn:3600},
                                (err,token)=>
                                {
                                    if(err)
                                    {
                                        console.log(err);
                                    }
                                    else
                                    {
                                        
                                        res.cookie("token",token,{httpOnly:true});
                                      
                                        return res.render('home',{flag:1});
                                    }
                                }
                                
                            )
                        }
                        else
                        {
                            console.log("Worng password");
                            res.redirect('/index',{flag:0});
                        }
                    })
                .catch(err=>console.log(err))
            }
            else
            {
                console.log("Username does not exist");
                res.redirect('/auth/login');
            }
        })
    .catch(err=>console.log(err));
});
// router.get('/home',(req,res))

router.get('/home2',passport.authenticate('jwt',{session:false}),(req,res)=>
{
    
    return res.render("home2");

})
router.get('/home3',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.render("home3");
})
router.get('/logout',passport.authenticate('jwt',{session:false}),(req,res)=>
{
    res.clearCookie("token");
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect("login");
    res.end();
})
module.exports=router;