const express=require('express');
const{UserModel}=require('../model/user.model')

const userRouter=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

userRouter.post('/signup',(req,res)=>{
   const {name,email,pass}=req.body;
    try{
        bcrypt.hash(pass,5,async (err,hash)=>{
            if(err)
            {
                res.status(200).json({error:err})
            }
            else{
                const user=new UserModel({name,email,pass:hash});
                await user.save();
        res.status(200).json({msg:'new  user has been registered'});
            }
        });
        
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})


userRouter.post('/login',async (req,res)=>{
    const {email,pass}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(user)
        {
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result)
                {
                    const access_token=jwt.sign({userID:user._id,username:user.name},"masai")
                    res.status(200).json({msg:'login successfull',access_token});
                }
                else{
                    res.status(200).json({msg:'please register,wrong credentials'});
                }
            })
        }
        else{
            res.status(200).json({msg:'register please, wrong credentials'})
        }
    }
    catch(err)
    {
        res.status(400).json({error:err});
    }
})

module.exports={
    userRouter
};


