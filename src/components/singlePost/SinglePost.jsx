import React, { useContext, useEffect, useState } from 'react'
import './singlePost.css'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';
export default function SinglePost() {   
const location =useLocation();
// console.log(location.pathname.split("/")[2])
const path= location.pathname.split("/")[2];  
// console.log(path);
const [post,setPost]=useState({});

const [title,setTitle]=useState("");
const[desc,setDesc]=useState("");
const[updateMode,setUpdateMode]=useState(false);

const PF="http://localhost:7000/images/"
useEffect(()=>{
  const fetchPosts = async ()=>{
    const res = await axios.get("http://localhost:7000/api/post/"+path)
    // console.log(res);
    // console.log(res);
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.desc);
  }
  fetchPosts();
  },[path])
  
  const {user} = useContext(Context); 
console.log(post)
  const handleDelete = async()=>{
    //  e.preventDefault();
     try{
       await axios.delete(`http://localhost:7000/api/post/${post._id}`,{
        data:{username:user.username,title:post.title}
      });
       window.location.replace("/");
     }catch(err){
      console.log(err)
     }
    }
     
    // console.log(user.username);
    const handleUpdate =async ()=>{
      try{
        await axios.put(`http://localhost:7000/api/post/${post._id}`,{
          username:user.username,
          title,
          desc
       });
        // window.location.reload();
        setUpdateMode(false);
      }catch(err){
       console.log(err)
      }
    }
  return (
    <div className='singlePost' >
        <div className="singlePostWrapper">
          {post.photo && (
 <img src={PF+post.photo} alt="" className='singlePostImg' />
          ) }{
            updateMode ? <input type="text" value={title} className='singlePostTitleInput' 
            autoFocus
            onChange={(e)=>setTitle(e.target.value)}
            /> :(
            <h1 className='singlePostTitle' >
              {title}   
            {user && post.username === user?.username &&(

              <div className="singlePostEdit"><i className="singlePostIcon fa-solid fa-pen-to-square"
              onClick={()=>setUpdateMode(true)}
              >

              </i>
            <i className="singlePostIcon  fa-solid fa-trash-can" onClick={handleDelete} ></i>
            </div>
            )}
            </h1> 
              )
            }
            <div className="singlePostInfo">
                <span className='SinglePostAuthor' >Author:  
                <Link to={`/?user=${post.username}`} className='link' >
                 <b>{post.username}</b>
                </Link>
                 </span>
                <span className='SinglePostDate' >{new Date(post.createdAt).toDateString()}</span>
            </div>  
            {
              updateMode ? (
                <>
                <textarea className='singlePostDescInput'value={desc} 
              onChange={(e)=>setDesc(e.target.value)}  />
              <button className='singlePostBtn' onClick={handleUpdate}>Update</button>
              </>
               ) :(
                <p className='singlePostDesc' >{desc}</p>
              )
            }
        </div>
    </div>
  )
}
