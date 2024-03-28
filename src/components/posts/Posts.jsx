import React from 'react'
import './posts.css'
import Post from '../post/Post'
export default function Posts({posts}) {

  return (
    <div className='posts' >  
    {posts.map((p)=>{
       return <Post post={p} />
        // console.log(`${p.title}`);
    })}
    
    </div>
  )
}
