import React, { useState,useEffect } from 'react'
import './sidebar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function SideBar() {  
  const [cats,setCats]=useState([]);
  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get("http://localhost:7000/api/categories")
      setCats(res.data);
    }
    fetchPosts();
    },[])

  return (
    <div className='sidebar' >
        <div className="sidebarItem">
            <span className='sidebarTitle' >ABOUT ME</span>  
            <img src="http://localhost:7000/images/gyanesh.jpeg" alt="" className='myImg' />
            <p>This site is developed by Gyanesh Ramdurgekar.</p>
        </div> 
        <div className="sidebarItem">
            <span className='sidebarTitle' >CATEGORIES</span>
            <ul className='sidebarList' > 
            {cats.map((c)=>{  
              return <Link  to={`/?cat=${c.name}`} className='link'>
                 <li className='sidebarListItem' >{c.name}</li>
              </Link>
            })}
            </ul>
        </div> 
        <div className="sidebarItem">
        <span className='sidebarTitle' >FOLLOW US</span> 
        <div className="sidebarSocial">
        <a href="https://www.instagram.com/yogesh_whetwar/" target='_blank'><i className="topIcon fa-brands fa-square-instagram">  </i></a>
    <a href="https://www.facebook.com/yogesh.whetwar/"> <i className="topIcon fa-brands fa-square-facebook"></i></a>
    <a href="https://www.linkedin.com/in/yogesh-whetwar-303b43203/"><i className="topIcon fa-brands fa-linkedin"></i></a> 
    <a href="https://github.com/Yogesh-Whetwar"><i className="topIcon fa-brands fa-square-github"></i></a> 
        </div>
        </div>
    </div>
  )
}
