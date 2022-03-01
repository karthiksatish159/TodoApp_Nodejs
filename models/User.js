const mongoose =require('mongoose');
const Schema=mongoose.Schema
const UserSchema=new Schema(
    {
        username:
        {
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true,
            lowercase:true
        },
        password:
        {
            type:String,
            required:true
        },
        Todo:[
            {
                text:{
                    type:String,
                    required:true
                }
            }
        ]
    });
    module.exports=userSc=mongoose.model("User",UserSchema);