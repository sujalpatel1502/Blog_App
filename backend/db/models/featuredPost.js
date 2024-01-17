const mongoose=require('mongoose');
const Schema=mongoose.Schema;// classs


const featuredPostSchema = new Schema({
    post:{
        type:mongoose.Schema.ObjectId,
        ref:"Post",
        required:true,
    }
}, {
    timestamps: true // Add timestamps option here
});
const FeaturedBlog=new mongoose.model("FeaturedPost",featuredPostSchema);

module.exports=FeaturedBlog