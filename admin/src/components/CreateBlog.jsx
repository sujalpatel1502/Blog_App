import React, { useEffect, useState } from 'react'
import PostForm from './PostForm'
import { createPost } from '../api/post';
import { useNavigate} from "react-router-dom"
function CreateBlog() {
  const[postInfo,setPostInfo]=useState(null)
  const navigate=useNavigate();
  const handleSubmit=async(data)=>{
      console.log("formdataaaa",data);
      const{error,post}=await createPost(data);
      if(error) return alert("error",error);
      console.log("slugggggggggg",post.slug);
      navigate(`/update-post/${post.slug}`);
  }
  useEffect(()=>{
    const result=localStorage.getItem('blogPost');
    if(!result) return;
    const oldPost=JSON.parse(result);
    setPostInfo({...oldPost});

  },[])
  return (
   <PostForm onSubmit={handleSubmit} initialPost={postInfo} resetAfterSubmit/>
  )
}

export default CreateBlog
