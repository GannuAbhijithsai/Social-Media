import React,{useEffect, useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import {Routes,Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Profile from './Profile';
import Forgotpasswordpage from './Forgotpasswordpage';
import Homepage from './Homepage';
import backg2 from './backg2.jpg'
export default function Login() {
    const [password,setpassword]=useState("");
    const [email,setemail]=useState("");
    const[alt,setalt]=useState(false);
    const [userstate,setuserstate]=useState(0);
  
   
  const naviHome= useNavigate();
  const onsubmit=async()=>{
    setuserstate(30);
    const response=await fetch(`${process.env.REACT_APP_APIURL}api/auth/login`,{
     method:'POST',
     headers:{
        'Content-Type':'application/json',
     },
     body :JSON.stringify({
              "email":email,
              "password":password,
     })
    })
    
    const data=await response.json();
    setuserstate(60);
    if(data.statuscode==200){
        setalt(false);
       localStorage.setItem("token", data.authtoken);
        const responses =await fetch(`${process.env.REACT_APP_APIURL}api/user/get/allusers`,{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
       
      });
      const datas=await responses.json();
      const findUserIdByUsername = (email) => {
        const user = datas.users.find((user) => user.email === email);
        return user ? user._id : null;
      };
      const findUserusernameByUsername = (email) => {
        const user = datas.users.find((user) => user.email === email);
        return user ? user.username : null;
      };
      

      const userid = findUserIdByUsername(email);
      const username = findUserusernameByUsername(email);
 
      localStorage.setItem("myid",`${userid}`)
      localStorage.setItem("username",`${username}`)
      console.log(userid);
      setuserstate(100);

            naviHome(`/Home`, {});
  
    
      
      
      
    }else{
        setuserstate(100);
        setalt(true);
       
    }
   }
  return (
    <>
    <Routes>
        <Route path="/Home" element={<Homepage/>}></Route>
        <Route path="/forgot" element={<Forgotpasswordpage/>}></Route>
    </Routes>
    <LoadingBar
        color='#f11946'
        progress={userstate}
      />
      {console.log(`hi${process.env.REACT_APP_APIURL}`)}
      <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="">Social Media</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
      </ul>
    </div>
  </div>
</nav>
<div className="w-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${backg2})`, backgroundSize:'cover', backgroundPosition: 'center',height:'100vh',overflow: 'hidden' }}>

          <form className="border border-light  border-3 rounded">
            <div  style={{margin:'6%'}}>
           
  <div className="mb-3">
  <div className="d-flex align-items-center justify-content-center" style={{color:'white', fontWeight:'bolder',fontSize:'24px'}}>
    Social-Media
  </div>
  <div id="emailHelp" className="form-text" style={{margin:'2%',color:'cornsilk'}}>Login in to see Photos and Videos from your friends</div>
 
  {alt===true? <div class={`alert alert-danger alert-dismissible fade show`} role="alert">
    <strong>Incorrect  Email or Password </strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>:""}

    <label htmlFor="exampleInputPassword1" className="form-label" style={{margin:'1%'}} ></label>
    <input type="email" className="form-control" id="exampleInputPassword1" onChange={e=>setemail(e.target.value)} placeholder='Enter your email' required/>
    <label htmlFor="exampleInputPassword1" className="form-label" style={{margin:'1%'}} ></label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={e=>setpassword(e.target.value)} placeholder='Enter your Password' required/>
  </div>
 
 <button  disabled={password==="" || email==="" ?true:false}type="button" onClick={onsubmit} className=" w-100 btn btn-primary">Login</button>
 <p class="text-center"><Link to="/forgot" style={{textDecoration:'none',color:'blue'}}>Forgot Password</Link></p>
  <hr></hr>
  <p class="text-center" style={{color:'grey'}}>Don't have an a account ? <Link to="/" style={{textDecoration:'none',color:'blue'}}>Sign up</Link></p>
  </div>
</form>
    </div>
    </>
  )
}
