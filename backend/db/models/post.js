const mongoose=require('mongoose');
const Schema=mongoose.Schema;// classs

// const postSchema=new Schema({// instance of class
//     title:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     content:{
//         type:String,
//         required:true,
//         trim:true 
//     },
//     meta:{
//         type:String,
//         required:true,
//         trim:true,
//         unique:true    
//     },
//     tags:[String],
//     author:{
//         // store the og user see from previous app socia; media
//         type:String,
//         default:"Admin"
//     },
//     slug:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     thumbnail:{
//         type:Object,
//         url:{
//             type:URL,
            
//         },
//         public_id:{
//             type:String,
            
//         }
//     },
    
    
// });
const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    meta: {
        type: String,
        // required: true,
        trim: true,
        unique: true
    },
    tags: [String],
    author: {
        type: String,
        default: "Admin"
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail:{
                type:Object,
                url:{
                    type:URL,
                    
                },
                public_id:{
                    type:String,
                    
                }
            },
}, {
    timestamps: true // Add timestamps option here
});
const Blog=new mongoose.model("Post",postSchema);

module.exports=Blog