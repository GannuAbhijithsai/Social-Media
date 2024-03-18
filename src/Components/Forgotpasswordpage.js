import React, { useState } from 'react'
import locked from './locked.png'
import { Link } from 'react-router-dom'
import {Routes,Route} from "react-router-dom";
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Otppage from './Otppage';
import backg2 from './backg2.jpg';
export default function ForgetPage() {
  const [text,settext]=useState("");
  const [userstate,setuserstate]=useState(0);
  const [email,setemail]=useState("");
  const[alt,setalt]=useState(false);
  const[messaged,setmessaged]=useState("");
  const naviotp= useNavigate();
    const onhandle  = async () => {
       settext("");
       setuserstate(30);
    const response = await fetch(`${process.env.REACT_APP_APIURL}api/auth/forgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email":email,
                   })
      });
setuserstate(70);
      const data = await response.json();
      setmessaged(data.message);
      setalt(true);
      setuserstate(100);
      naviotp(`/otp`, { state:{email:email} });
     
      setemail("");
  };

const onchan=(event)=>{
  
   settext(event.target.value);
   setemail(event.target.value);
};
  return (
    <>
     <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/otp" element={<Otppage/>}></Route>
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
    <div class=" w-100 vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${backg2})`, backgroundSize:'cover', backgroundPosition: 'center',height:'100vh',overflow: 'hidden' }}>
      <form class="rounded border border-light border border-2" >
      <div style={{margin:'7%'}}>
  <div class="mb-3">
    <div class="d-flex align-items-center justify-content-center"><img src={locked} style={{height:'80px'}}></img></div>
    <div class="d-flex align-items-center justify-content-center" style={{color:'white', fontWeight:'bold'}}>Trouble logging in?</div>
  <div id="emailHelp" class="form-text" style={{margin:'4%',color:'cornsilk'}}>Enter your email here and we'll send you a OTP to your email to get back into your account</div>
  {alt===true?<div class={`alert alert-${messaged=="OTP sent to your email"?"success":"danger"} alert-dismissible fade show`} role="alert">
    <strong>{messaged=="OTP sent to your email"?messaged:"Invalid Email"}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>:""}
    <input type="email" onChange={onchan} class="form-control border-dark border border-1" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Email" value={text}/>
    <div id="emailHelp" class="form-text" style={{margin:'4%',color:'cornsilk'}}>We'll never share your email with anyone else.</div>
    <div class="d-flex align-items-center justify-content-center"><button type="button" disabled={text==""?true:false} onClick={onhandle} class="w-100 btn btn-primary">Send OTP</button></div> 
  </div>
  <div class="d-flex align-items-center justify-content-center">  <p class="text-center" style={{fontWeight:'bold'}}><Link to="/login" style={{textDecoration:'none',color:'blue'}}>Back to Login</Link></p></div>
  </div>
</form>
    </div>
    </>
  )
}
