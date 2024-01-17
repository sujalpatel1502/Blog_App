import React from 'react'
import dateformat from "dateformat"
import {BsPencilSquare,BsTrash}from 'react-icons/bs'
import { Link } from 'react-router-dom'

function PostCard({item,deleteListener}) {
    if(!item) return null
    //console.log("carddd",item);
    const {title,thumbnail,tags,meta,createdAt}=item
    console.log("thumbnailll",thumbnail);
  return (
    <div className='m-10'>
      <img src={thumbnail || './logo192.png'}  alt={title}/>
      <h1 className='text-lg font-semibold'>{title}</h1>
      <p>{meta}</p>
      <p>{tags.join(',')}</p>
      <p>{dateformat(createdAt,"mediumDate")}</p>
        <div className='flex space-x-3'>
    <Link to={`/update-post/${item.slug}`}>
        <BsPencilSquare/>
    </Link>
    <Link onClick={deleteListener}>
        <BsTrash/>
    </Link>

        </div>
    </div>
  )
}

export default PostCard
