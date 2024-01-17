const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/fs-blog",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("sucessssss"))
.catch((err)=>console.log("errro",err));