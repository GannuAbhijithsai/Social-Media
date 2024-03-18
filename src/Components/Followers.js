
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import {Routes,Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import LoadingBar from 'react-top-loading-bar';
export default function Followers() {
  const [search,setsearch]=useState("");
    const [alt,setalt]=useState(false);
    const [searchusername,setsearchusername]=useState("");
    const [searchname,setsearchname]=useState("");
    const [userstate,setuserstate]=useState(0);
    const [searchid,setsearchid]=useState("")
    const [pres,setpres]=useState(false);
  const location = useLocation();
  const { state } = location;
  console.log(state.id);
  console.log(state.follower);
  const naviprofile= useNavigate();
  const [followersData, setFollowersData] = useState([]);

  const fetchFollowerData = async (element) => {
    setuserstate(30);
    const response = await fetch(`${process.env.REACT_APP_APIURL}api/user/specific/${element}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setuserstate(100);
    return data.user;
  };

  useEffect(() => {
    const fetchData = async () => {
      const followersPromises = state.follower.map((element) => fetchFollowerData(element));
      const followersData = await Promise.all(followersPromises);
      setFollowersData(followersData);
      console.log(followersData)
    };

    fetchData();
  }, [state.follower]);
const onhandle=async (event)=>{
  setuserstate(30);
    const response=await fetch(`${process.env.REACT_APP_APIURL}api/user/unfollow`,{
        method:'PUT',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ "userID":event,
      
      })
      
    })
    setuserstate(100);
    console.log(response);
}
const onsearche=async ()=>{
  setuserstate(30);
  setpres(followersData.some(item => item.username === search));
  console.log(pres);
  const response=await fetch(`${process.env.REACT_APP_APIURL}/api/user/search`,{
 method:'POST',
 headers:{
   'Content-Type': 'application/json',
   'Authorization': `${localStorage.getItem('token')}`
 },
 body: JSON.stringify({ "username":search,
              
           })
 });
 const data=await response.json();
 setalt(true);
 setsearchusername(data.username);
 setsearchname(data.name);
 setsearchid(data._id);
 console.log(data.name);
 setsearch("");
 setuserstate(100);
}  
const goto=()=>{
  naviprofile(`/profile`, {});
}
  return (
    <div style={{color:'white',background:'black',overflowY:'scroll',maxHeight:'100vw'}}>
        <Routes>
        <Route path="/profile" element={<Profile/>}></Route>
    </Routes>
    <LoadingBar
        color='#f11946'
        progress={userstate}
      />
        <div>
      
    </div>
          <nav className="navbar bg-body-tertiary" data-bs-theme="dark" style={{marginBottom:'20px'}} >
<div className="d-flex  " >
<div><a href=""  style={{width:'5%',textDecoration:'none',color:'white'}}  onClick={(e) => {
    e.preventDefault(); // Prevents the default behavior (navigation)
    goto(); // Call your function
  }}><h1 style={{margin:'5px'}}>&larr;</h1></a></div>
<div style={{marginTop:'10px'}}> <h3  style={{fontWeight:'bold',color:'white'}}>{state.username}</h3></div>
  
  
</div>
</nav>
<form className="d-flex justify-content-center" role="search" style={{marginBottom:'20px'}}>
    <input className="form-control me-2" type="search" placeholder="Search" onChange={event=>setsearch(event.target.value)} aria-label="Search" style={{width:'30%'}}/>
    <button className="btn btn-outline-success" type="button" onClick={onsearche}>Search</button>
  </form>
      {alt&&pres&&<div className="alert alert-light alert-dismissible fade show" role="alert">
 <div classNameName="container text-center">
      <div className="row">
       <div className="col"> <h3 style={{fontWeight:'bold'}}>{searchusername}</h3></div>
      <div className="col">  <h3 style={{fontWeight:'bold'}}>{searchname}</h3></div>
      <div className="col"><button type="button" className="btn btn-secondary" onClick={async() => onhandle(searchid)}>Remove</button></div>
      </div>
    </div>
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>}
      <h3>All Followers</h3>
<hr></hr>

      {followersData.map((followerData) => (
        <div classNameName=" text-center"key={followerData._id} style={{color:'white',background:'black'}}>
         <div className="row" style={{color:'white',background:'black'}}>
            <div className="col text-center" ><img src={followerData.Photo} alt="..." className="card-img-top rounded-circle" style={{width:"5rem",height:"5rem",borderRadius: '50%',border: '2.5px solid transparent',backgroundImage: 'linear-gradient(to right, #ff8a00, #e52e71, #ff8a00)'}}></img></div>
           <div className="col text-center" style={{textAlign:'center'}}> <h3 style={{fontWeight:'bold',textAlign:'center'}}>{followerData.username}</h3></div>
          <div className="col text-center">  <h3 style={{fontWeight:'bold'}}>{followerData.name}</h3></div>
          <div className="col text-center"><button type="button" className="btn btn-secondary" onClick={async() => onhandle(followerData._id)}>Remove</button></div>
          </div>
          </div>
      ))}
       
    </div>
  );
      }
    

