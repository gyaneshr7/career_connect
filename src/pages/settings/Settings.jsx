
import './settings.css';
import SideBar from '../../components/siderbar/SideBar';
import { useContext ,useState} from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
export default function Settings() {
const {user,dispatch}=useContext(Context);
const [username,setUsername]=useState("");
const[email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [file, setFile]=useState(null);
const [success,setSuccess]=useState(false);

const PF="http://localhost:7000/images/"
const handleSubmit=async (e)=>{
  e.preventDefault();
  dispatch({type:"UPDATE_START"});

  const updatedUser={
    userId:user._id,
    username,
    email,
    password
    
  } 
  if(file){
    const data=new FormData();
    const filename = Date.now()+ file.name;
    data.append("name",filename);
    data.append("file",file);
    updatedUser.profilePic =filename;
    try{
      await axios.post("/upload",data);
    }catch(err){
      console.log("Error in uploading the file: "+err);
    } 
  } ;
  // console.log(updatedUser);
  try{
    // console.log("start")
    const res=await axios.put(`http://localhost:7000/api/user/${user._id}`,updatedUser);
    dispatch({type:"UPDATE_SUCCESS", payload:res.data});
    // window.location.replace("/post/"+res.data._id);
    setSuccess(true);
  // console.log("done")
  }catch(err){ 
    dispatch({type:"UPDATE_FAILURE"});
    console.log(err)
  }
  } 
  const handleDelete=async (e)=>{
    e.preventDefault(); 
    
    try{
      // console.log("start")
      // console.log(user) 
     const res=await axios.delete(`http://localhost:7000/api/user/${user._id}`,{ 
      data:{
        userId:user._id
      }
      // username:user.username,
      // password:user.password
     });
      dispatch({type:"LOGOUT"})
    //  dispatch({type:"UPD", payload:res.data});
    window.location.replace("/");
    // setSuccess(true);
  // console.log("done")
  }catch(err){ 
    // dispatch({type:"UPDATE_FAILURE"});
    console.log(err)
  }
  }
  return (
    <div className="settings">
        <div className="settingsWrapper"> 
        <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Acount</span>
            {/* <span className="settingsDeleteTitle">Delete Your Acount</span>  */}
            <button className="settingsSubmit"  onClick={handleDelete}type="submit" >Delete</button>
        </div> 
        <form action=""  className='settingsForm' autocomplete="off" onSubmit={handleSubmit} >
<label htmlFor="">Profile Picture</label>
<div className="settingsProfilePicture">
    <img src={file ? URL.createObjectURL(file): PF+user.profilePic} alt="" className='myimg'/>  
    <label htmlFor="fileInput">
    <i className="settingsPPIcon fa-solid fa-circle-user"></i>
    {/* <i class="fa-solid fa-user"></i> */}
    </label>
    <input type="file" id='fileInput' style={{display:"none"}} 
     onChange={(e)=>setFile(e.target.files[0])}/>
</div>   
<label htmlFor="">UserName</label>
<input type="text" placeholder={user.username}onChange={(e)=>setUsername(e.target.value)}/>
<label htmlFor="">Email</label> 
<input type="text"  placeholder={user.email} 
onChange={(e)=>setEmail(e.target.value)}
/>
<label htmlFor="">Password</label> 
<input type="password" onChange={(e)=>setPassword(e.target.value)}autoComplete='off' />
<button className="settingsSubmit"  onClick={handleSubmit}type="submit" >Update</button>
{success && 
<span style={{color:"green",textAlign:"center"}} >Profile has been updated</span> }
        </form>
        </div>
            <SideBar/>
    </div>
  )
}
