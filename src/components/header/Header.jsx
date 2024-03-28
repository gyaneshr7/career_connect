import React from 'react'
import './header.css'
export default function Header() {
  return (
    <div className='header' >
           <div className='headerTitle' >
            {/* <span   className="headerTitleSM" >React & node</span> */}
            <span className='headerTitleLg' >Blog Site</span>
           </div> 
           {/* <img  className='headerImg' src="http://localhost:7000/images/main.jpg" alt="" /> */}
           {/* <img  className='headerImg' src="https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-computer-laptop-260nw-1255851382.jpg" alt="" /> */}
           <img  className='headerImg' src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="" />
           {/* <img  className='headerImg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS36nH5xHygf-lFyjk8P8hgTJmXPbl4PsefsA&usqp=CAU" alt="" /> */}
    </div>
  )
}
