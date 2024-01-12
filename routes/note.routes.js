const express=require('express');
const noteRouter=express.Router();
const{NotesModel}=require('../model/notes.model')
const{auth}=require('../middleware/auth.middleware')

noteRouter.use(auth)//will be applicable to all the notes routes

noteRouter.get('/',async(req,res)=>{
try{
const note=await NotesModel.find({userID:req.body.userID})
res.status(200).json(note);
}catch(err)
{
    res.status(400).json({error:err});
}
})

noteRouter.post('/create',async(req,res)=>{
const{title,body,userID,username}=req.body
try{
const note=new NotesModel({title,body,userID,username})
await note.save();
res.status(200).json({msg:'new note has been created'})
}
catch(err)
{
    res.status(400).json({error:err});
}
})

noteRouter.patch('/update/:id',async(req,res)=>{
    const _id=req.params.id;
    const{userID}=req.body;
    const payload=req.body;
   const note= await NotesModel.findOne({_id})
   if(userID===note.userID)
   {
    try{
        await NotesModel.findByIdAndUpdate(_id,payload,{new:true});
        res.status(200).json({msg:'note has been updated'});
        }
        catch(err){
        res.status(400).json({error:err})
        }
   }
   else{
    res.json({msg:'you are not authorised'});
   }
})

noteRouter.delete('/delete/:id',async(req,res)=>{
const _id=req.params.id;
const{userID}=req.body;
const note= await NotesModel.findOne({_id})
if(userID===note.userID)
{
try{
    await NotesModel.findByIdAndDelete(_id);
    res.status(200).json({msg:'note has been deleted'});
    }
    catch(err){
    res.status(400).json({error:err})
    }
}
else{
res.json({msg:'you are not authorised'});
}
})

module.exports={
    noteRouter
};