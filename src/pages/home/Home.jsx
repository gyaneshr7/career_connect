import './home.css';
import React, { useState,useEffect } from 'react'
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import SideBar from '../../components/siderbar/SideBar';  

import Single from '../single/Single';
import axios from 'axios';
import {useLocation } from 'react-router-dom';
export default function Home() {   

  const [posts,setPosts]=useState([]);
 const {search} =useLocation();
// console.log(location)
useEffect(()=>{
const fetchPosts = async ()=>{
  const res = await axios.get("http://localhost:7000/api/post"+search)
  // console.log(res);
  setPosts(res.data);
}
fetchPosts();
},[search])

  return ( 
    <>  
        <Header/>
    <div className='home' >
        <Posts posts={posts} />
       <SideBar/>
    
    </div>
    </>
  )
}
