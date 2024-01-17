require('./db/index')
require("dotenv").config();
const cors=require('cors');

const morgan=require('morgan')
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const postRouter=require('./routers/post')
app.use(cors())
app.use(morgan("dev"));
app.use(express.json())
app.use('/api/post',postRouter);

app.use((err,req,res,next)=>{
    res.status(500).json({error:err.message});
})
    try{ 
        app.listen(port,()=>{ 
           console.log(`${port} YESsss CONNECTED`); 
        })
    } catch(error){
        console.log(error);
    }

