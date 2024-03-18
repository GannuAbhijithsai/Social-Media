import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import Changepasswordpage from './Changepasswordpage';
import backg2 from './backg2.jpg';
export default function Otppage() {
    const location = useLocation();
    const { state } = location;
    const navichange= useNavigate();
    const [otp,setotp]=useState("")
    const [alt,setalt]=useState(false);
    const [userstate,setuserstate]=useState(0);
    const onsubmit =async()=>{
        setuserstate(30);
        const response=await fetch(`${process.env.REACT_APP_APIURL}api/auth/change-password-verification`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                "email":state.email,
                "otp":otp
            })
        })
        setuserstate(70);
        const data=await response.json();
        console.log(data);
        if(data.message==="OTP verification successfull"){
            setalt(false);
            setuserstate(100);
           navichange(`/change`, { state:{email:state.email} });
         
        }else{
            setuserstate(100);
            setalt(true);
            
        }
    }
  return (
    <>
    <Routes>
        <Route path="/change" element={<Changepasswordpage/>}></Route>
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
  <div id="emailHelp" className="form-text" style={{margin:'2%',color:'cornsilk'}}>Just one more step:enter the 6 digit code that we sent to our registered email</div>
  {alt===true? <div class={`alert alert-danger alert-dismissible fade show`} role="alert">
    <strong>Wrong OTP</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>:""}

    
    <label htmlFor="exampleInputPassword1" className="form-label" style={{margin:'1%'}} ></label>
    <input type="text" className="form-control" id="exampleInputPassword1" onChange={e=>setotp(e.target.value)} placeholder='Enter your OTP' required/>
  </div>
 
 <button  disabled={otp===""?true:false}type="button" onClick={onsubmit} className=" w-100 btn btn-primary">Confirm</button>
  
  </div>
</form>
    </div>
    </>
  )
}
