const express=require('express');
const app=express();
const {connection}=require('./db');
const {noteRouter}=require('./routes/note.routes')
const cors=require('cors');
const {userRouter}=require('./routes/user.routes');

app.use(express.json());
app.use(cors());
app.use('/users',userRouter);
 app.use('/notes',noteRouter);

app.get('/',(req,res)=>{
    res.send('home page')
})


app.listen(8080,async ()=>{
    try{
        await connection;
        console.log('database is connected');
    }
    catch(err)
    {
        console.log(err);
    }
    console.log('server is running at port 8080');
})