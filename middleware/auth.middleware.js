const jwt=require('jsonwebtoken');
const{UserModel}=require('../model/user.model')
const auth=async (req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
if(token)
{
    try{
        const decoded=jwt.verify(token,'masai');
    if(decoded)
    {
        req.body.userID=decoded.userID;
        req.body.username=decoded.username;
        next();
    }
    else{
        res.json({msg:'your are not authorize'});
    }
    }
    catch(err)
    {
        console.log(err);
        res.status(400).json({error:err})
    }

}
else{
    res.json({msg:'you are not authorised'});
}
}

module.exports={
    auth
};