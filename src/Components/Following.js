import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import {Routes,Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import LoadingBar from 'react-top-loading-bar';
export default function Following() {
  const [followingData, setFollowingData] = useState([]);
    const [search,setsearch]=useState("");
    const [alt,setalt]=useState(false);
    const [userstate,setuserstate]=useState(0);
    const [searchusername,setsearchusername]=useState("");
    const [searchname,setsearchname]=useState("");
    const [pres,setpres]=useState(false);
    const location = useLocation();
    const { state } = location;
    
    console.log(state.id);
    console.log(state.following);
    const naviprofile= useNavigate();
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
      const followingPromises = state.following.map((element) => fetchFollowerData(element));
      const followingData = await Promise.all(followingPromises);
      setFollowingData(followingData);
    };

    fetchData();
  }, [state.following]);

  if (!state) {
    return null; // Handle the case where state is not available
  }

  const onsearche=async ()=>{
    setuserstate(30);
   setpres(followingData.some(item => item.username === search));
   console.log(pres);
   const response=await fetch(`${process.env.REACT_APP_APIURL}api/user/search`,{
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
  console.log(data.name);
  setsearch("");
  setuserstate(100);
    
}

const goto=()=>{
  naviprofile(`/profile`, {});
}
  return (
    <div style={{color:'white',background: 'black !important',overflowY:'scroll',maxHeight:'100vh',overflowX:'hidden'}}>
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
<div className="d-flex" >
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
 {alt&&pres&&<div className="alert alert-light alert-dismissible fade show" role="alert" style={{color:'white',background:'black'}}>
 <div classNameName="container text-center" style={{color:'white',background:'black'}}>
      <div className="row" style={{color:'white',background:'black'}}>
       <div className="col"> <h3 style={{fontWeight:'bold'}}>{searchusername}</h3></div>
      <div className="col">  <h3 style={{fontWeight:'bold'}}>{searchname}</h3></div>
      <div className="col"><button type="button" className="btn btn-secondary">Following</button></div>
      </div>
    </div>
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>}
  <h2>Following</h2>
<hr></hr>

  {followingData.map((followingData) => (
    <div classNameName="text-center"key={followingData._id} style={{color:'white',background:'black'}}>
      <div className="row" style={{color:'white',background:'black'}}>
      <div className="col"><img src={followingData.Photo} alt="..." className="card-img-top rounded-circle" style={{width:"4rem",height:"4rem",borderRadius: '50%',border: '2.5px solid transparent',backgroundImage: 'linear-gradient(to right, #ff8a00, #e52e71, #ff8a00)'}}></img></div>
       <div className="col"> <h3 style={{fontWeight:'bold'}}>{followingData.username}</h3></div>
      <div className="col">  <h3 style={{fontWeight:'bold'}}>{followingData.name}</h3></div>
      <div className="col"><button type="button" className="btn btn-secondary">Following</button></div>
      </div>
    </div>
  ))}
</div>
  )
}
