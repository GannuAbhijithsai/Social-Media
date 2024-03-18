import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Routes,Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import LoadingBar from 'react-top-loading-bar';
import backg2 from './backg2.jpg';
export default function Signup() {
    const [userstate,setuserstate]=useState(0);
    const [name,setname]=useState("");
  const [password,setpassword]=useState("");
  const [email,setemail]=useState("");
  const[alt,setalt]=useState(false);
  const[username,setusername]=useState("");
  const [auth,setauth]=useState("");
const [usersemail,setusersemail]=useState([]);
const [usersusername,setusersusername]=useState([]);

const fetchuserdata=async ()=>{
      
        try{
        const response =await fetch(`${process.env.REACT_APP_APIURL}api/user/get/allusers`,{
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
            
          },
         
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        const data = await response.json();
        const usernames = data.users.map(user => user.username);
        const emails = data.users.map(user => user.email);
    
        setusersemail(emails);
        setusersusername(usernames);
    
        console.log(usernames);
        console.log(emails);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      

};
useEffect(() => {
    
    const fetchData = async () => {
        await fetchuserdata();
   
      };
  
      fetchData();
  
    
  }, []);
  const naviprofile= useNavigate();
 const onsubmit=async ()=>{
    setuserstate(30);
    if(!(usersusername.includes(username) || usersemail.includes(email))){
 
    const response=await fetch(`${process.env.REACT_APP_APIURL}api/auth/signup`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({ "name":name,
        "username":username,
        "email":email,
        "password":password,
    
    })
    })
    setuserstate(70);
    const data=await response.json();
    setauth(data.authtoken);
    console.log(auth);
    setalt(false);
    console.log(alt);
    setuserstate(100);
    naviprofile(`/login`, { state:{} });
   
    
}else{
    setuserstate(100);
    setalt(true);
    console.log(alt);
   
}

 }
  return (
    <>
   <Routes>
        <Route path="/login" element={<Login/>}></Route>
    </Routes>
    <LoadingBar
        color='#f11946'
        progress={userstate}
      />
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
<div className="w-100 vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${backg2})`, backgroundSize:'cover', backgroundPosition: 'center',height:'100vh',overflow: 'hidden' }} >
          <form className="border border-light border-3 rounded">
            <div  style={{margin:'6%'}}>
           
  <div className="mb-3">
  <div className="d-flex align-items-center justify-content-center" style={{color:'white', fontWeight:'bolder',fontSize:'24px'}}>
    Social-Media
  </div>
  <div id="emailHelp" className="form-text" style={{margin:'2%',color:'cornsilk'}}>Sign up to see Photos and Videos from your friends</div>
  {alt===true? <div class={`alert alert-danger alert-dismissible fade show`} role="alert">
    <strong>Username or Email already exists</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>:""}
  <label htmlFor="exampleInputPassword1"  className="form-label" style={{margin:'1%'}}></label>
    <input type="text" className="form-control" id="email" onChange={e=>setname(e.target.value)} placeholder='Enter your Name' required/>
    <label htmlFor="exampleInputPassword1"  className="form-label" style={{margin:'1%'}} ></label>
    <input type="username" className="form-control" id="exampleInputPassword1" onChange={e=>setusername(e.target.value)} placeholder='Enter your Username' required />
    <label htmlFor="exampleInputPassword1" className="form-label" style={{margin:'1%'}} ></label>
    <input type="email" className="form-control" id="exampleInputPassword1" onChange={e=>setemail(e.target.value)} placeholder='Enter your email' required/>
    <label htmlFor="exampleInputPassword1" className="form-label" style={{margin:'1%'}} ></label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={e=>setpassword(e.target.value)} placeholder='Enter your Password' required/>
  </div>
 
 <button  disabled={password==="" || email==="" || name===""|| username===""?true:false}type="button" onClick={onsubmit} className=" w-100 btn btn-primary">Sign Up</button>
  <hr></hr>
  <p class="text-center" style={{color:'grey'}}>Have an a account ? <Link to="/login" style={{textDecoration:'none',color:'blue'}}>Login</Link></p>
  </div>
</form>
    </div>
    </>
  )
}
