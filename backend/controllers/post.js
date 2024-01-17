const { json } = require('express');
const Post=require('../db/models/post');
const FeaturedBlog = require('../db/models/featuredPost');
const cloudinary=require('../cloud/index');
const { isValidObjectId } = require('mongoose');

const FEATURED_POST_COUNT=4;
const addToFeaturedPost = async (postId)=>{
    const isAlreadyExists=await FeaturedBlog.findOne({post:postId});
        if(isAlreadyExists) return 
   const featuredPost = new FeaturedBlog({post:postId})
   await featuredPost.save();

   // we are sorting in descendiing order bcz we want to show only 4 latest posts
   const featuredindesc = await FeaturedBlog.find({}).sort({createdAt:-1})

   featuredindesc.forEach( async(postt,index) =>{
    if(index >=FEATURED_POST_COUNT)
    // by tgis we are maintaining only 4 fetaured posts
        await FeaturedBlog.findByIdAndDelete(postt._id)
   })
}
const removeFromFeatured=async(postId)=>{
    await FeaturedBlog.findOneAndDelete({post:postId})
}
const isFeaturd=async(postId)=>{
    const post =await FeaturedBlog.findOne({post:postId})
    return post ? true:false
}


const createPost=async(req,res)=>{
    try {
        // console.log(req.file);
        const{title,meta,content,slug,author,tags,featured}=req.body
        const{file}=req;
        // return console.log(file);
        const isAlreadyExists=await Post.findOne({slug});
        if(isAlreadyExists) return res.status(500).json({error:'please give unique slug'})
        let arrtags,arrfeatured;
        
        if(tags){
            arrtags=JSON.parse(tags)
        }
        
        // console.log(typeof(arrtags));
        
        const newPost=Post({
            title,meta,content,slug,author,tags:arrtags
        })

        if(file){
          const {secure_url:url,public_id}= await cloudinary.uploader.upload(file.path)
            newPost.thumbnail={url,public_id}        
            
        }
       await newPost.save();
       if(featured){
        
        await addToFeaturedPost(newPost._id)
    }
        // res.status(200).json(newPost)
        res.json({
            post:{
                id:newPost._id,
                title,
                meta,
                slug,
                thumbnail:newPost.thumbnail?.url,
                author,
                content,
                featured,
                tags,
                // createdAt
            }
          }) 
    } catch (error) {
        res.status(500).json({error:error.message})
    }  
}

const deletePost=async(req,res)=>{
        const id=req.params.id;
        if(!isValidObjectId(id)){
            return res.status(500).json({error:"Invalid request"})
        }
        const post=await Post.findById(id)
        if(!post){
            return res.status(404).json({error:"post not found"})
        }
        // we are deleting here but we also want to delete thumbnail from the cloudinary
        const public_id=post.thumbnail?.public_id;
        if(public_id){
            const {result}=await cloudinary.uploader.destroy(public_id);
        if(result !== 'ok') return res.status(404).json({error:'coul not remove thumbnail'})
        }
    await Post.findByIdAndDelete(id);
    // also need to emove the post id from the featured
    await removeFromFeatured(id);
    res.json({message:"removed sucessfully"});
}

const updatePost=async(req,res)=>{
    const{title,meta,content,slug,author,tags,featured}=req.body
        const{file}=req;
    const id=req.params.id;
        if(!isValidObjectId(id)){
            return res.status(500).json({error:"Invalid request"})
        }
        const post=await Post.findById(id)
        if(!post){
            return res.status(404).json({error:"post not found"})
        }
        // for updating the thumbnail first we need to delete the existing image from the cludinary
        const public_id=post.thumbnail?.public_id;
        if(public_id && file){
            const {result}=await cloudinary.uploader.destroy(public_id);
        if(result !== 'ok') return res.status(404).json({error:'coul not remove thumbnail'})
        }

        if(file){
            const {secure_url:url,public_id}= await cloudinary.uploader.upload(file.path)
              post.thumbnail={url,public_id} 
          }
          post.title=title;
          post.meta=meta;
          post.content=content;
          post.slug=slug;
          post.author=author;
          post.tags=tags;

          // now if we want to update the features
          if(featured){
            await addToFeaturedPost(post._id);
          }
          else{
            // if we want to remove this post from the featured
            await removeFromFeatured(post._id);
          }
          await post.save();
          res.json({
            post:{
                id:post._id,
                title,
                meta,
                slug,
                thumbnail:post.thumbnail?.url,
                author,
                content,
                featured,
                tags,
                // createdAt
            }
          }) 
        
        
}

const getPost=async(req,res)=>{
    const id=req.params.id;
        if(!isValidObjectId(id)){
            return res.status(500).json({error:"Invalid request"})
        }
        const post=await Post.findById(id)
        if(!post){
            return res.status(404).json({error:"post not found"})
        }
        const featured = await isFeaturd(post._id);
        const{title,meta,content,slug,author,tags,createdAt}=post

        res.json({
            post:{
                id:post._id,
                title,
                meta,
                slug,
                thumbnail:post.thumbnail?.url,
                author,
                content,
                featured,
                tags,
                createdAt
            }
          }) 
}

const getFeaturedPost=async(req,res)=>{
    
   const featuredindesc = await FeaturedBlog.find({}).sort({createdAt:-1}).limit(4).populate('post');
   // formating it in a proper way
   res.json({
    posts:featuredindesc.map(({post})=>({
        id:post._id,
        title:post.title,
        content:post.content,
        meta:post.meta,
        slug:post.slug,
        thumbnail:post.thumnail?.url,
        author:post.author
    }))
})
    
}
const getLatestPost=async(req,res)=>{
    const {pageNo=0,limit=10}=req.query;
    const posts=await Post.find({}).sort({createdAt:-1}).skip(parseInt(pageNo) * parseInt(limit)).limit(parseInt(limit));
    const postCount=await Post.countDocuments();
    // formating in our required format
    
    res.json({
        posts:posts.map((post)=>({
            id:post._id,
            title:post.title,
            content:post.content,
            meta:post.meta,
            slug:post.slug,
            thumbnail:post.thumbnail?.url,
            author:post.author,
            createdAt:post.createdAt,
            tags:post.tags
        })),
        postCount
    })
    
    // skip is used for pagination
    // for examople skip(20) --> so it will skip first 20 data and will give another data after 20
    // pageno=0,limit=10-->so skip will be 0 and limit is 10 so first 10 data will be fetched when pagNo is 1 limit 10 so skip 10
}
const searchPost=async(req,res)=>{
    const {title}=req.query;
    if (!title || !title.trim()) {
        return res.status(401).json({ error: 'search query missing or empty' });
    }

    const posts=await Post.find({title:{ $regex:title,$options:"i"}});
    res.json({
        posts:posts.map((post)=>({
            id:post._id,
            title:post.title,
            content:post.content,
            meta:post.meta,
            slug:post.slug,
            thumbnail:post.thumbnail?.url,
            author:post.author,
            createdAt:post.createdAt,
            tags:post.tags
        }))
    })

}

const relatedPost=async(req,res)=>{
        const{id}=req.params;
        if(!isValidObjectId(id)) return res.status(404).json({error:"Invalid request"})

        const post =await Post.findById(id);
        if(!post) return res.status(404).json({error:"post not found"});

        // now we will fetch another post sbased on the above posts tags

        const realatedPosts=await Post.find({
            tags:{ $in: [...post.tags]},
            // now we will exclude the main post from the related post because that post will also have same tags
            _id: {$ne: post._id},
        }).sort({createdAt:-1}).limit(5)

        res.json({
            posts:realatedPosts.map((post)=>({
                id:post._id,
                title:post.title,
                content:post.content,
                meta:post.meta,
                slug:post.slug,
                thumbnail:post.thumnail?.url,
                author:post.author
            }))
        })

}

module.exports={
    createPost,
    deletePost,
    updatePost,
    getPost,
    getFeaturedPost,
    getLatestPost,
    searchPost,
    relatedPost
}
// import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//   cloud_name: 'dn0gpdwe2', 
//   api_key: '558269788321146', 
//   api_secret: 'HdqTbrUhvHysVDCWhBdyvhzHE0c' 
// });