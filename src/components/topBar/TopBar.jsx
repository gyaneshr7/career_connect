import React, { useContext } from 'react'
import './topbar.css'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
function TopBar() {  
  const {user,dispatch}=useContext(Context);  
  const handleLogout =()=>{
        dispatch({type:"LOGOUT"})
  } 

  const PF="http://localhost:7000/images/"
  return (
    <div className='top' > 
     <div className="topLeft">
     <a href="https://www.instagram.com/yogesh_whetwar/" target='_blank'><i className="topIcon fa-brands fa-square-instagram">  </i></a>
    <a href="https://www.facebook.com/yogesh.whetwar/"> <i className="topIcon fa-brands fa-square-facebook"></i></a>
    <a href="https://www.linkedin.com/in/yogesh-whetwar-303b43203/"><i className="topIcon fa-brands fa-linkedin"></i></a> 
    <a href="https://github.com/Yogesh-Whetwar"><i className="topIcon fa-brands fa-square-github"></i></a> 
     </div>
     <div className="topCenter">
        <ul  className='topList' >
         <Link to='/' className='link' >
          <li className='topListItem'  >HOME</li>
          </Link>   
         {/* <Link to='/'className='link'>
            <li className='topListItem' >ABOUT</li>

          </Link>   
         <Link to='/'className='link'>

            <li className='topListItem' >CONTACT</li>
          </Link>    */}
         <Link to='/write'className='link'>
            <li className='topListItem' >WRITE</li>
          </Link>   
         
         <Link to='/resource'className='link'>
            <li className='topListItem' >RESOURCE</li>
          </Link>   
         
         <Link to='/'className='link'>
            <li className='topListItem'onClick={handleLogout} > {user && "LOGOUT"}</li>
          </Link>   
        </ul>
     </div>
     <div className="topRight">
      <Link to='/settings' className='link' >
        {
          user ? (
            <img   
            className='topImg'
            src={PF+user.profilePic} alt="" /> 
          ) : (  
              <ul className='topList' >
 <li className='topListItem tp'> <Link className='link' to='/login'>LOGIN</Link></li>
 <li className='topListItem tp'>  
 <Link className='link' to='/register'>REGISTER</Link>
 </li>
              </ul>
              
              
            
          )
        }
       
          <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </Link>
     </div>
    </div>
  )
}

export default TopBar
