import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import Login from './Login';
import backg2 from './backg2.jpg';
export default function Resetpasspage() {
  const location = useLocation();
const { state } = location;
const [userstate,setuserstate]=useState(0);
  const [setpassword,setsetpassword]=useState("");
  const [confirmpassword,setconfirmpassword]=useState("");
  const[alt,setalt]=useState(false);
  const[messaged,setmessaged]=useState("");
  const onhandle=(event)=>{
           setsetpassword(event.target.value);
           setconfirmpassword(event.target.value);
                  
  }
  const navilogin= useNavigate();
  const onsubmit = async () =>{
    setuserstate(30);
    console.log(setpassword);
    console.log(confirmpassword);
    if(setpassword==confirmpassword){
      setconfirmpassword("");
      const response = await fetch(`${process.env.REACT_APP_APIURL}api/auth/changepassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": state.email,
          "password": setpassword
        })
      });
setuserstate(70);
      const data = await response.json();
      setmessaged(data.message);
      setalt(true);
      console.log(data);
      console.log(messaged);
      setuserstate(100);
      navilogin(`/login`, {});
      
    }else{
      setuserstate(100);
      setalt(true);
      setmessaged("Set Password and Confirm Password must be same")
      
    }
  }
  return (
    <><Routes>
    <Route path="/profile" element={<Login/>}></Route>
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
    <div className="w-100 vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${backg2})`, backgroundSize:'cover', backgroundPosition: 'center',height:'100vh',overflow: 'hidden' }}>
          <form className="border border-light border-3 rounded">
            <div  style={{margin:'6%'}}>
           
  <div className="mb-3">
  <div className="d-flex align-items-center justify-content-center" style={{color:'white', fontWeight:'bolder',fontSize:'24px'}}>Create New Password</div>
  <div id="emailHelp" className="form-text" style={{margin:'2%',color:'cornsilk'}}>Your Password Must contain atleat 6 characters and should include a combination of numbers,letters and special characters (!$@%)</div>
  {alt===true? <div class={`alert alert-${messaged=="password changed successfully"?"success":"danger"} alert-dismissible fade show`} role="alert">
    <strong>{messaged==null?"Invalid email  Id or Password should Contain atleat 6 characters and one special character":messaged}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>:""}
    <label htmlFor="exampleInputPassword1"  className="form-label" style={{margin:'1%'}} ></label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={e=>setsetpassword(e.target.value)} placeholder='Set New Password' required />
    <label htmlFor="exampleInputPassword1" className="form-label" style={{margin:'1%'}} ></label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={e=>setconfirmpassword(e.target.value)} placeholder='Confirm Password' required/>
  </div>
 
  <button  disabled={confirmpassword==""?true:false}type="button" onClick={onsubmit} className=" w-100 btn btn-primary">Submit</button>
  </div>
</form>
    </div>
    </>
  )
}
