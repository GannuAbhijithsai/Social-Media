import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import {Routes,Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Profile from './Profile';
import InfiniteScroll from 'react-infinite-scroll-component';
import Allpost from './Allpost';
export default function Searchedprofile() {
    const [userpic,setuserpic]=useState(null);
    const [Follower,setFollower]=useState([]);
    const [userstate,setuserstate]=useState(0);
    const [posts,setposts]=useState([]);
    const location = useLocation();
  const { state } = location;
  const naviprofile= useNavigate();
  const profilepic = async ()=>{
    setuserstate(30);
    const response = await fetch(`${process.env.REACT_APP_APIURL}api/user/specific/${state.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
      });
      const data=await response.json();
    
    setuserpic(data.user.Photo);
    setFollower(data.user.followers);
    setuserstate(100);
  };
  const postdata=async ()=>{
    try{
    const response =await fetch(`${process.env.REACT_APP_APIURL}api/post/userpost/${state.id}`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${state.auth}`
      },
     
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const data = await response.json();
    setposts(data);
   // console.log(data);
    console.log(posts);
    console.log(posts.body);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  };
 
  useEffect(() => {
  
  
    setuserstate(30)
    const fetchData = async () => {
      await   profilepic();
     await postdata();
     setuserstate(100);
    };

    fetchData();
  }, []);
  const naviallp=useNavigate();
    const allpost=()=>{
       naviallp('/allpost',{state:{id:state.id,auth:state.auth,username:state.username}});    
    }
  
    console.log(state);
    const onhandle=async ()=>{
      setuserstate(30);
        let response=await fetch(`${process.env.REACT_APP_APIURL}api/user/follow`,{
            method:'PUT',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${state.auth}`,
              },
              body: JSON.stringify({ "userID":state.id,
          
          })
        })
        console.log(response);
        setuserstate(100);
        window.location.reload();
    }
    const onunfollow=async ()=>{
      let response=await fetch(`${process.env.REACT_APP_APIURL}api/user/unfollow`,{
            method:'PUT',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${state.auth}`,
              },
              body: JSON.stringify({ "userID":state.id,
          
          })
        })
        window.location.reload();
    }
    const goto=()=>{
      naviprofile(`/profile`, {});
    }
    const onpost=()=>{
      naviallp('/allpost',{state:{id:state.id,auth:localStorage.getItem('token'),username:state.username,userpic:userpic}});    
     }
  return (
    
    <div style={{overflowY:'scroll',maxHeight:'100vh'}}>
      <Routes>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/allpost" element={<Allpost/>}></Route>
    </Routes>
    <LoadingBar
        color='#f11946'
        progress={userstate}
      />
        <nav className="navbar bg-body-tertiary" data-bs-theme="dark" style={{marginBottom:'20px'}} >
<div className="d-flex  " >
<div><a href=""  style={{width:'5%',textDecoration:'none',color:'white'}}><h1 style={{margin:'5px'}}  onClick={(e) => {
    e.preventDefault(); // Prevents the default behavior (navigation)
    goto(); // Call your function
  }}>&larr;</h1></a></div>
<div style={{marginTop:'10px'}}> <h3  style={{fontWeight:'bold',color:'white'}}>{state.username}</h3></div>
  
  
</div>
</nav>
    
  <div className="d-flex justify-content-between" style={{width:'90vw'}}>
    <div style={{width: "20vw",border:'none',marginLeft:'1vw',marginTop:'5vw'}}>
<img src={userpic}className="card-img-top rounded-circle" alt="..." style={{width:"10vw",height:"10vw",borderRadius: '50%',border: '2.5px solid transparent',backgroundImage: 'linear-gradient(to right, #ff8a00, #e52e71, #ff8a00)'}}/>
<div style={{marginTop:'4%'}}>
  <h4>{state.name}</h4>
  <p>bio</p>
 
</div>
</div>
<div style={{width: "15vw",border:'none',marginLeft:'8vw',marginTop:'5vw'}}>

<div>
<a className="navbar-brand" style={{fontWeight:'bold',fontSize:'40px'}} href="//" onClick={onpost}>{state.post}</a>
  
  <p style={{fontWeight:'bold'}}>Posts</p>
</div>
</div>
<div style={{width: "15vw",border:'none',marginLeft:'1vw',marginTop:'5vw'}}>

<div>
<a className="navbar-brand" style={{fontWeight:'bold',fontSize:'40px'}} href="///">{state.follower}</a>
  <p style={{fontWeight:'bold'}}>Followers</p>
</div>
</div>
<div style={{width: "15vw",border:'none',marginLeft:'1vw',marginTop:'5vw'}}>

<div>
<a className="navbar-brand" style={{fontWeight:'bold',fontSize:'40px'}} href="///">{state.following}</a>
  <p style={{fontWeight:'bold'}}>Following</p>
</div>
</div>

</div>
<div className="d-flex align-items-center justify-content-around">
<button className={`btn btn-${Follower.includes(localStorage.getItem('myid'))===true?`light`:`primary`}`} style={{width:'30%',fontWeight:'bold',borderColor:'black'}} onClick={Follower.includes(localStorage.getItem('myid'))===true?null:onhandle}>{Follower.includes(localStorage.getItem('myid'))===true?"Following":"Follow"}</button>

{Follower.includes(localStorage.getItem('myid'))&& <button className={`btn btn-primary`} style={{width:'30%',fontWeight:'bold',borderColor:'black'}} onClick={onunfollow}>unFollow</button>}

</div>

<h1 style={{margin:'30px',marginLeft:'45%'}}>Posts</h1>
<hr></hr>

<div className="container" >
  <div className="row" >
    {posts.map((element, index) => (
      <div className="col-md-4 mb-3" key={index}>
        <div className="image-wrapper" style={{ width: '100%',paddingBottom: '100%', position: 'relative',height:'40%' }}>
          <img src={element.ImageURL} style={{ position:'absolute',width:'100%',height:'100%',objectFit:'fill',cursor:'pointer'}} alt="..." className="card-img-top" onClick={allpost}  />
        </div>
      </div>
      
    ))}
    <div style={{backgroundImage:userpic}}></div>
  </div>
</div>



      
     
  </div>
  )
}
