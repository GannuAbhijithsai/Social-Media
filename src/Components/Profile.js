import React,{useEffect,useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import {Routes,Route} from "react-router-dom";
import Searchedprofile from './Searchedprofile';
import { useNavigate } from 'react-router-dom';
import Deleteprofile from './Deleteprofile';
import Followers from './Followers';
import Following from './Following';
import LoadingBar from 'react-top-loading-bar';
import { useLocation } from 'react-router-dom';
import Editprofile from './Editprofile';
import newpost from './newpost.png';
import Createpost from './Createpost';
import Allpost from './Allpost';
import Savedpost from './Savedposts';
import home from './home.png';
import search1 from './search.png';
import user from './user.png'
import Homepage from './Homepage';



export default function Profile() {
  const [usernam,setusernam]=useState("");
  const [nam,setnam]=useState("");
  const [userpic,setuserpic]=useState(null);
  const [userpost,setuserpost]=useState("");
  const [userfollower,setuserfollower]=useState("");
  const [userfollowing,setuserfollowing]=useState("");
  const [userbio,setuserbio]=useState("");
  const [search,setsearch]=useState("");
  const [follower,setfollower]=useState("");
  const [following,setfollowing]=useState("");
  const [posts,setposts]=useState([]);
  const [suggdata,setsuggdata]=useState([]);
  const [userstate,setuserstate]=useState(0);
  const [suggest,setsuggest]=useState(false);
 const [userid,setuserid]=useState("");
  const location = useLocation();
  const { state } = location;

 
    const fetchUserProfile = async () => {
      
  const response = await fetch(`${process.env.REACT_APP_APIURL}api/user/specific/${localStorage.getItem('myid')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });
      const data = await response.json();
      
      setusernam(data.user.username);
      setnam(data.user.name);
      setuserpic(data.user.Photo);
      setuserfollower(data.user.followers.length);
      setuserfollowing(data.user.following.length);
      setuserpost(data.user.posts.length);
      setuserbio(data.user.bio);
      setfollower(data.user.followers);
      setfollowing(data.user.following);
      setuserid(data.user._id)
      console.log(data.posts);
   console.log(localStorage.getItem('myid'));
    
  };
  


  
 
  
const postdata=async ()=>{
  try{
  const response =await fetch(`${process.env.REACT_APP_APIURL}api/post/userpost/${localStorage.getItem('myid')}`,{
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
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
   
    console.log(localStorage.getItem('myid'));
    console.log(localStorage.getItem('token'))
    setuserstate(30)
    const fetchData = async () => {
      
      await fetchUserProfile();
     await postdata();
     setuserstate(100);
    };

    fetchData();
  }, []);
  


  const navigate = useNavigate();

const onhandle =async ()=>{
  setuserstate(30);
  const response=await fetch(`${process.env.REACT_APP_APIURL}api/user/search`,{
  method:'POST',
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('token')}`,
  },
  body: JSON.stringify({ "username":search,
               
            })
  });
  const data=await response.json();
  setuserstate(100)
  console.log(data);
  
 
     
   navigate(`/search`, { state: {id:data._id,username: data.username, name: data.name,follower:data.followers.length,following:data.following.length,post:data.posts.length,auth:localStorage.getItem('token')} });
    
     
}

const navidelete= useNavigate();
    const ondelete=()=>{
      navidelete(`/deleteaccount`, {});
    
    }
    const navifoll= useNavigate();
  const onli=()=>{
    navifoll(`/followers`, { state:{follower:follower,username:usernam}});
  }
  const navifollowing= useNavigate();
  const onlin=()=>{
    navifollowing(`/following`, { state:{following:following,username:usernam} });
  }
  
  const naviedit=useNavigate();
  const editpro=()=>{
    console.log()
    naviedit(`/edit`,{});
  }
  const navicreate=useNavigate();
 const createpos=()=>{
  navicreate('/createpost',{state:{username:usernam}});
 }
 const naviallp=useNavigate();
    const allpost=()=>{
      naviallp('/allpost',{state:{id:localStorage.getItem('myid'),auth:localStorage.getItem('token'),username:usernam,userpic:userpic}});    
    }
    const navisavepost=useNavigate();
    const savedpos=()=>{
        navisavepost(`/savedpost`,{state:{username:usernam}})
    }
    const naviprofile1=useNavigate();
    const navihome=useNavigate();
    
    console.log(localStorage.getItem('myid'));
      const gotoprofile=()=>{
          
          naviprofile1(`/profile`, {  });
      }
      const gotohome=()=>{
          
          navihome(`/Home`, { });
      }
      
      const onallpost=()=>{
       naviallp('/allpost',{state:{id:localStorage.getItem('myid'),auth:localStorage.getItem('token'),username:usernam,userpic:userpic}});    
      }
      const getsugges=async ()=>{
        if(suggest===false){
        const response=await fetch(`${process.env.REACT_APP_APIURL}api/user/get/suggestions?limit=15`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`${localStorage.getItem('token')}`,
          },

        })
        const data=await response.json();
        setsuggdata(data);
        setsuggest(true);
      }else{
        setsuggest(false);
      }
      }
      const onsuggest =async (event)=>{
        setuserstate(30);
        const response=await fetch(`${process.env.REACT_APP_APIURL}api/user/search`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ "username":event,
                     
                  })
        });
        const data=await response.json();
        setuserstate(100)
        console.log(data);
        
       
           
       //    navigate(`/search`, { state: {localStorage.getItem('myid'):localStorage.getItem('myid'),userauth:localStorage.getItem('token'),id:data._id,username: data.username, name: data.name,follower:data.followers.length,following:data.following.length,post:data.posts.length,localStorage.getItem('myid'):localStorage.getItem('myid'),auth:localStorage.getItem('token') } });
          
           
      }
      const navilogin=useNavigate();
      const onlog=()=>{
        navilogin(`/login`,{});
        localStorage.clear();
      }
  return (
   <>
    <div style={{backgroundColor:'black',color:'white',fontFamily:'cursive',overflowY:'scroll',maxHeight:'100vh'}}>
      <Routes>
        <Route path="/search" element={<Searchedprofile/>}></Route>
        <Route path="/edit" element={<Editprofile/>}></Route>
        <Route path="/deleteaccount" element={<Deleteprofile/>}></Route>
        <Route path="/followers" element={<Followers id={localStorage.getItem('myid')} follower={follower}/>}></Route>
        <Route path="/following" element={<Following id={localStorage.getItem('myid')} follower={follower}/>}></Route>
        <Route path="/createpost" element={<Createpost/>}></Route>
        <Route path="/allpost" element={<Allpost/>}></Route>
        <Route path="/savedpost" element={<Savedpost/>}></Route>
        <Route path="/Home" element={<Homepage/>}></Route>
    </Routes>
    <LoadingBar
        color='#f11946'
        progress={userstate}
      />
       <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
       
  <div className="container-fluid" >
    <Link className="navbar-brand" style={{fontWeight:'bold'}} to="/profile">{usernam}</Link>
    <form className="d-flex" role="search" >
   <a href="" onClick={(e) => {e.preventDefault(); createpos(); }} ><img src={newpost} alt="" style={{marginRight:'20px',marginTop:'5px',height:'30px'}}></img></a>
      <input className="form-control me-2" type="search" placeholder="Search" onChange={event=>setsearch(event.target.value)} aria-label="Search"/>
      
      <button className="btn btn-outline-success" type="button" style={{marginRight:'20px'}} onClick={onhandle}>Search</button>
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{usernam}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li>
          <a href="" onClick={(e) => {e.preventDefault(); savedpos(); }} style={{fontWeight:'bold',textDecoration:'none',color:'White',marginBottom:'10px'}} >Saved Posts</a>
          </li>
          <li>
          <button className="btn btn-outline-danger" type="button" style={{marginRight:'20px',marginTop:'20px'}} onClick={onlog} >Sign out</button>
          </li>
          <li className="nav-item">
          <button className="btn btn-outline-danger" type="button" style={{marginRight:'20px',marginTop:'20px'}} onClick={ondelete}>Delete our account</button>

          </li>
         
        </ul>
      
      </div>
    </div>
    </form>
  
    
    
  </div>

</nav>

      
    <div  className="d-flex justify-content-between" style={{width:'90vw'}}>
      <div style={{width: "20vw",border:'none',marginLeft:'1vw',marginTop:'7vw'}}>
  <img src={userpic} className="card-img-top rounded-circle" alt="..." style={{width:"13vw",height:"13vw",borderRadius: '50%',border: '2.5px solid transparent',backgroundImage: 'linear-gradient(to right, #ff8a00, #e52e71, #ff8a00)'}}/>
  <div style={{marginTop:'4%'}}>
    <h4>{nam}</h4>
    <p>{userbio}</p>
   
  </div>
  </div>
  <div style={{width: "15vw",border:'none',marginLeft:'8vw',marginTop:'5vw'}}>
 
  <div >
  <a className="navbar-brand" style={{fontWeight:'bold',fontSize:'40px'}}href=""   onClick={(e) => {
    e.preventDefault(); // Prevents the default behavior (navigation)
    onallpost(); // Call your function
  }}>{userpost}</a>
    
    <p style={{fontWeight:'bold'}}>Posts</p>
  </div>
  </div>
  <div style={{width: "15vw",border:'none',marginLeft:'1vw',marginTop:'5vw'}}>
 
  <div>
  <a className="navbar-brand" style={{fontWeight:'bold',fontSize:'40px'}} href=""   onClick={(e) => {
    e.preventDefault(); // Prevents the default behavior (navigation)
    onli(); // Call your function
  }}>{userfollower}</a>
    <p style={{fontWeight:'bold'}}>Followers</p>
  </div>
  </div>
  <div style={{width: "15vw",border:'none',marginLeft:'1vw',marginTop:'5vw'}}>
 
  <div>
  <a className="navbar-brand" style={{fontWeight:'bold',fontSize:'40px'}} href=""
  onClick={(e) => {
    e.preventDefault(); // Prevents the default behavior (navigation)
    onlin(); // Call your function
  }}>{userfollowing}</a>
    <p style={{fontWeight:'bold'}}>Following</p>
   
  </div>
  </div>
  
</div>

<div className="d-flex align-items-center justify-content-around" style={{marginTop:'5vw'}}>
<button className="btn btn-primary" style={{width:'30vw',fontWeight:'bold'}} onClick={editpro}>Edit Profile</button>
<button className="btn btn-primary" style={{width:'40vw',fontWeight:'bold'}} onClick={getsugges}>{suggest==false?"Get Suggestions":"Turn off Suggestions"}</button>

</div>
{suggest && (<div class="d-flex" style={{height:'25vw',overflowX:'auto'}}>
  {suggdata.map((element,index)=>(
    <div class="d-flex flex-column align-items-center" key={index} style={{margin:'3vw',borderStyle:'solid',borderWidth:'2px',borderColor:'white',paddingTop:'1vw',minWidth:'30%',borderRadius:'1.5%',cursor:'pointer',width:'auto'}} onClick={()=>onsuggest(element.username)}>
      <img src={element.Photo} alt=".." className="card-img-top rounded-circle" style={{width:'8vw',height:'10vw',margin:'1vw',borderRadius: '50%',border: '2.5px solid transparent',backgroundImage: 'linear-gradient(to right, #ff8a00, #e52e71, #ff8a00)'}}></img>
      <p class="d-flex align-items-center" style={{marginTop:'1vw',fontWeight:'bold'}}>{element.username}</p>
    </div>
  ))}
</div>)}

<h1 style={{margin:'30px',marginLeft:'45%'}}>Posts</h1>
<hr></hr>

<div className="container" style={{overflowY:'auto',maxHeight:'100vw'}}>
  <div className="row">
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

<div style={{paddingTop:'12vw'}}></div>
      
     
        
        <nav className="navbar bg-body-tertiary" id="footbar" data-bs-theme="dark" style={{position:'fixed',bottom:'0px',width:'100vw',zIndex:9999}}>
       
       <div className="d-flex justify-content-between" >
        <div style={{marginLeft:'21vw'}}>
            <a href="" onClick={(e) => {e.preventDefault(); gotohome(); }}><img id="footbarhome" src={home} alt="" style={{}}></img></a>
        </div>
      
        <div style={{marginLeft:'45vw'}}>
            <a href="" onClick={(e) => {e.preventDefault(); gotoprofile(); }}><img id="footbarprofile" src={user} alt="" style={{}}></img></a>
        </div>

         
       </div>
     
     </nav>
     </div>
    </>
     
  ) 
}
