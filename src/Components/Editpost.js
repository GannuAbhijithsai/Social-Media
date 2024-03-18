import React,{useState,useEffect} from 'react'
import { Link, json } from 'react-router-dom'
import {Routes,Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Profile from './Profile';
import LoadingBar from 'react-top-loading-bar';
export default function Editpost() {
    const [userpic,setuserpic]=useState("");
    const [body,setbody]=useState("");
    const [pic,setpic]=useState("");
    const [userstate,setuserstate]=useState(0);
    const location = useLocation();
  const { state } = location;
 
  
    const naviprofile= useNavigate();
    const goto=()=>{
        naviprofile(-1);
      }

      const onFileChange =  (file) => {
    console.log(file);
        setuserpic(URL.createObjectURL(file));
       setpic(file);
               
      };

      const onhandle=async()=>{
        console.log(state.auth);
        setuserstate(30);
        const formData = new FormData();
        formData.append('body',body);
        formData.append('photo', pic);
        const response=await fetch(`${process.env.REACT_APP_APIURL}api/post/update/${state.postid}`,{
            method:'PUT',
            headers:{
                
                'Authorization': `${localStorage.getItem('token')}`,
            },
            body:formData,
        });
        setuserstate(100);
        goto();
      }
  return (
    <div style={{color:'white',background:'black',overflowY:'scroll',maxHeight:'100vh'}}> 
        <Routes>
    <Route path="/profile" element={<Profile/>}></Route>
</Routes>
<LoadingBar
        color='#f11946'
        progress={userstate}
      />
<div>
<nav className="navbar bg-body-tertiary" data-bs-theme="dark">
       <div className="d-flex" >
      
        <div><a href="/////***"  style={{width:'5%',textDecoration:'none',color:'white'}} onClick={goto}><h1 style={{margin:'5px'}}>&larr;</h1></a>  </div> 
        <div style={{marginTop:'11px'}}><Link className="navbar-brand" style={{fontWeight:'bold'}} to="/profile"> {state.username}</Link></div>
       </div>
     </nav>
 
</div>
<h1 style={{fontWeight:'bold',width:'100vw'}} class="text-center">Edit a Post</h1>
<div className="d-flex flex-column align-items-center">
<div style={{width: "55vw",height:"40vw",border:'none',marginTop:'20px',marginBottom:'30px'}}>
<img src={userpic===""?state.postpic:userpic} alt="..." style={{width: "55vw",height:"40vw",border:'none',marginTop:'20px'}}/>

</div>
<div class="text-center" style={{width:'100vw'}}>
    <input type="file" accept="image/*" onChange={event=>onFileChange(event.target.files[0])} />
    </div>
    </div>
    <div className="d-flex flex-column align-items-center" style={{width:'100vw'}}>
    <div>
  <label for="exampleFormControlTextarea1" class="form-label" style={{margin:'10px'}}><h3>Edit the Caption for your post</h3></label>
  </div>
  <div class="d-flex align-items-center justify-content-around" style={{width:'100vw'}}>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style={{borderWidth:'3px',borderColor:'black',width:'80vw'}} onChange={event=>setbody(event.target.value)}></textarea>
  </div>
</div>
<div className="d-flex align-items-center justify-content-around" style={{marginTop:'2%',width:'100vw'}}>
<button class="btn btn-primary" type="button" onClick={onhandle}>Save your Changes</button>
</div>

    </div>
  )
}



