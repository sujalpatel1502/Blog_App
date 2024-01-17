import React, { useEffect, useState } from 'react'
import { deletePost, getPosts } from '../api/post';
import PostCard from './PostCard';
import { useSearch } from './context/SearchProvider';

let pageNo=0;
const POST_LIMIT=9;
const getPagination=(lengthh)=>{
  const divison= lengthh / POST_LIMIT;
  if(divison % 1 !==0){
    return Math.floor(divison) +1;
  }
  return divison;
}
function Home() {
  const{searchResult}=useSearch();
  const[posts,setposts]=useState([]);
  const[totalPostCount,setTotalPostCount]=useState([]);
 const paginationcount= getPagination(totalPostCount);
 console.log("countpgiiiiii",paginationcount);
 const paginationArr=new Array(paginationcount).fill(' ')
 console.log("pagiarrayyayay",paginationArr);
  const fetchPosts=async()=>{
     const{error,posts,postCount}= await getPosts(pageNo,POST_LIMIT);
    //  console.log("counttttttttt",postCount);
     if(error){
      return console.log(error);
     }
    //  console.log(posts);
     setposts(posts)
     setTotalPostCount(postCount);
     console.log("countttt",totalPostCount);
  }
  useEffect(()=>{
    fetchPosts();
  },[])
  const fetchMorePosts=(index)=>{
    pageNo = index;
    fetchPosts();
  }
  const handleDelete= async({id})=>{
    const {error,message}=await deletePost(id);
    if(error) return console.log(error);

    console.log(message);

    const newPosts=posts.filter(p=> p.id !== id)

    setposts(newPosts);
  }
  return (
    <div>
   <div className='grid grid-cols-3 gap-3 p-5'>
    {
      searchResult.length
        ?searchResult.map((item)=>{
          return <PostCard key={item.id} item={item} deleteListener={()=>handleDelete(item)}/>
        })
      :posts.map((item,index)=>{
        
          return <PostCard key={item.id} item={item} deleteListener={()=>handleDelete(item)}/>
      })
    }
   </div>
   <div className='py-5 flex justify-center items-center space-x-3'>
   {paginationArr.map((_,index)=>{
    return <button  onClick={()=>fetchMorePosts(index)} className={index === pageNo?'text-blue-500 border-b border-b-blue-500' : 'text-gray-500'}>{index+1}</button>
   })}
   </div>
   </div>
   
  )
}

export default Home
