import React from 'react'
import './post.css'
import { Link } from 'react-router-dom';
export default function Post({post}) {
  // console.log(`${post.title}`);
  // console.log("hello")

  const PF="http://localhost:7000/images/"
  return (
    <div className='post' style={{width: "40%"}} >
      {post.photo && 
        <img src={PF+post.photo} alt="" className='postImg' /> 
      }
         
        <div className="postInfo">
            <div className="postCats">
               {post.categories.map(c=>{
                return  <span className="postCat">{c.name}</span>
               })}
               
            </div>  
            <Link  to={`/post/${post._id}`} className='link' >
            <span className="postTitle">
               {post.title}
            </span> 
            </Link>
            <hr />
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div> 
        <p className='postDesc'>{post.desc}</p>
    </div>
  )
}
