const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser');
const passport = require('passport');
const User = require('../../models/User');

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>
{
    User.findOne({_id:req.user.id})
    .then(person=>
        {
             res.render("todo",{val:person.Todo,flag:1});
        })
    .catch(err=>console.log(err));
})
router.post('/save',passport.authenticate('jwt',{session:false}),(req,res)=>{
    User.findOne({_id:req.user.id})
    .then(person=>
        {
            if(person)
            {
                const to=
                {
                    text:req.body.todo
                }
                if(typeof req.body.todo ===undefined||req.body.todo=="")
                {
                    return res.render("todo");

                }
                person.Todo.push(to);
                person.save()
                .then(isDone=>
                    {
                        // console.log(isDone.Todo);
                        if(isDone)
                        {
                            res.render("todo",{val:isDone.Todo,mes:"sadasd",flag:1});
                        }
                        else
                        {
                            res.status(404).json({err:"There is problem"});
                        }
                    })
                .catch(err=>console.log(err))
            }
            else
            {
                res.status(404).json({err:"There is problem"});
            }
        })
    .catch(err=>console.log(err))
})
router.get('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res)=>
{
    User.find({_id:req.user.id})
    .then(person=>
        {
            if(person)
            {
               const remove=person[0].Todo.map(ele=>ele.id).indexOf(req.params.id);
              person[0].Todo.splice(remove,1);
              person[0].save()
              .then(person2=>
                {
                    if(person2)
                    {
                        res.render("todo",{val:person2.Todo,flag:1});
                    }
                })
              .catch(err=>console.log(err));
            }
            else
            {
                res.render("login");
            }
        })
    .catch(err=>console.log(err));
})
module.exports=router;