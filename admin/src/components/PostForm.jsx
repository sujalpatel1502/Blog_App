import React, { useEffect, useRef, useState } from 'react'
import {ImSpinner11,ImEye}from 'react-icons/im'
const defaultPost={
  title:'',
  thumbnail:'',
  featured:false,
  content:'',
  tags:'',
  meta:''
}

function PostForm({initialPost,onSubmit,resetAfterSubmit}) {
  const[postInfo,setPostInfo]=useState({...defaultPost});
  const[thumbUrl,setThumbUrl]=useState('');
  const{title,content,featured,tags,meta}=postInfo;
useEffect(()=>{
    setPostInfo({...initialPost});
},[initialPost])
  const handleChange=({target})=>{
      const{value,name,checked}=target;
      if(name === 'thumbnail'){
        const file=target.files[0];
        if(!file.type?.includes('image')){
          return alert('thi is not image');
        }
        setPostInfo({...postInfo,thumbnail:file})
        return setThumbUrl(URL.createObjectURL(file));
      }
      if(name === 'featured'){
       return  setPostInfo({...postInfo,[name]:checked})
      }
      if(name === 'tags'){
        const newTags=tags.split(',')
        if(newTags.length > 4) console.log('only 44444444')
        // return  setPostInfo({...postInfo,[name]:checked})
       }
   
       if(name === 'meta' && meta.length > 150){
      return setPostInfo({...postInfo,meta:value.substring(0,150)})
       }
       const newPost={...postInfo,[name]:value}
       setPostInfo({...newPost});

       localStorage.setItem('blogPost', JSON.stringify(newPost))
       


  }
  const handleSubmit=(e)=>{
        e.preventDefault();
  const{title,content,featured,tags,meta}=postInfo;
  if(!title.trim()) return alert('not proper title')
  if(!content.trim()) return alert('not proper content')
  if(!tags.trim()) return alert('not proper tags')
  if(!meta.trim()) return alert('not proper meta')

  const slug=title.toLowerCase().replace(/[^a-zA-Z ]/g, ' ').split(" ").filter(item => item.trim()).join("-");

  const newTags=tags.split(",").map((item)=> item.trim()).splice(0,4);

  const formData=new FormData();
  const finalPost={...postInfo,tags:JSON.stringify(newTags),slug:slug};
  console.log("slugggggg",slug);
  for(let key in finalPost){
    // console.log(finalPost[key]);
        formData.append(key,finalPost[key]);
  }

  onSubmit(formData)
  if(resetAfterSubmit) resetForm()
  }
const resetForm=()=>{
    setPostInfo({...defaultPost});
    localStorage.removeItem("blogPost")
}
  return (
    <form   onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        
      <h1 className='text-xl font-semibold text-gray-700'>Create New Post</h1>
      <div className="flex items-center space-x-5">
        <button onClick={resetForm} type='button' className='flex items-center space-x-2 p-3 ring-1 ring-blue-500 rounded h-10'> <ImSpinner11/><span>Reset</span></button>
        <button type='button'  className='flex items-center space-x-2 p-3 ring-1 ring-blue-500 rounded h-10'> <ImEye/><span>View</span></button>

        <button   className='flex items-center space-x-2 p-3 ring-1 ring-blue-500 rounded h-10'>Post</button>

      </div>
      
      </div>
      <div>
      <input name='featured' value={featured} onChange={handleChange} id='featued' type='checkbox' hidden/>
      <label  className='flex items-center space-x-2' htmlFor="featued">
        <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">

         { featured && (<div className='w-2 h-2 rounded-full bg-blue-500'/>)}
        </div>

        <span>Featured</span>
      </label>
      </div>

      <input onChange={handleChange}  value={title} name='title'  type='text' className='text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold'
      placeholder='post title'
      />
      <textarea  onChange={handleChange} value={content} name='content' className='resize-none outline-none focus:ring-1 rounded p-2 w-full font-semibold' placeholder='## Markdown'/>
<div>
<label htmlFor='tags'>Tags</label>
<input
onChange={handleChange}
value={tags}
name='tags'
id='tags'
type='text' placeholder='Enter tags'
className='outline-none focus:ring-1 rounded p-2 w-full'
/>
</div>
<div>
<label htmlFor='meta'>Meta Description</label>
<textarea  onChange={handleChange} value={meta} name='meta' id='meta' className='resize-none outline-none focus:ring-1 rounded p-2 w-full font-semibold h-28' placeholder='meta description'/>

</div>
<div className='w-1/4 '>
  <h1 className='text-xl'>Thumbnail</h1>
  <div>
  <input  onChange={handleChange} name='thumbnail' id='thumbnail' type='file' hidden/>
  <label htmlFor='thumbnail' className='cursor-pointer'>
    
    { thumbUrl?<img src={thumbUrl}/>:<div className="border border-dashed border-gray-500 aspect-video flex flex-col justify-center items-center">

  <span>Select Thumbnail</span>

    </div>}
    
    </label>
  </div>
  
</div>
    </form>
  )
}

export default PostForm
