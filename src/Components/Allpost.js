import React,{useState,useEffect} from 'react'
import { Link, json } from 'react-router-dom'
import {Routes,Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Profile from './Profile';
import comment from './comment.png';
import Moment from 'react-moment';
import slashcomment from './slashcomment.png';
import heart from './heart.png';
import Editpost from './Editpost';
import heartnot from './heartnot.png'
import save from './save.png';
import unsave from './unsave.png';
export default function Allpost() {
    const [commentclicked,setcommentclicked]=useState(false);
  const [posts,setposts]=useState([]);
  const [postid,setpostid]=useState("");
  const [commentusername,setcommentusername]=useState("");
  const [newcomment,setnewcomment]=useState("");
  const [commentpic,setcommentpic]=useState(null);
  const [userstate,setuserstate]=useState(0);
  const [more,setmore]=useState(false)
  const [postComments, setPostComments] = useState({});
    const location = useLocation();
    const { state } = location;
    const [liked, setLiked] = useState(false);
    const [hidelikecount, setHideLikeCount] = useState({});
    const [hidecomment, setHidecomment] = useState({});

  const fetchMoreComments = async (postId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_APIURL}/api/post/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("fetch");
      console.log(data);
      setPostComments(prevComments => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || [])]
      }));
    } catch (error) {
      console.error('Error fetching more comments:', error);
    }
  };
  
  const handleLike =async (event) => {
    setuserstate(30);
   const response =await fetch(`${process.env.REACT_APP_APIURL}api/post/handlelike/${event}`,{
    method:'PUT',
    headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`,
      },
    body: JSON.stringify({ "postId":event,
          
          })

   })
   setuserstate(100);
 
   window.location.reload();
  };
  const [commented, setCommented] = useState(false);

  const handleCommentClick = () => {
    setCommented(!commented);
   
  };
    const postdata=async ()=>{
        setuserstate(30);
        try{
        const response =await fetch(`${process.env.REACT_APP_APIURL}api/post/userpost/${state.id}`,{
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
       setuserstate(100);
        console.log(posts);
        console.log(posts.body);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      };
      
  
  
  useEffect(() => {
   
    console.log(state.id);
    console.log(localStorage.getItem('myid'))
    setuserstate(30)
    const fetchData = async () => {
     await postdata();
   
     setuserstate(100);
    };

    fetchData();
  }, []);
    
   const handlecomment=(event)=>{
    console.log("hi");
    setpostid(event);
    if(commentclicked===false){
    setcommentclicked(true);
    }else{
        setcommentclicked(false);
    }
   }
    const naviprofile= useNavigate();
    const gotoone=()=>{
       
            naviprofile(-1); // Go back to the previous page
          
     
      }
     
      const postcomment=async (event)=>{
        setuserstate(30);
                 const response=await fetch(`${process.env.REACT_APP_APIURL}api/post/addcomment/${event}`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`${localStorage.getItem('token')}`
                    },
                    body:JSON.stringify({
                        "comment":newcomment,
                    })
                 })
                 setuserstate(100);
                 window.location.reload();
      }
      const postmore= (event)=>{
        setpostid(event);
        if(more==true){
            setmore(false);
        }else{
            setmore(true);
        }
      }
      const handlelikecount = (postId) => {
        setHideLikeCount((prev) => ({
          ...prev,
          [postId]: !prev[postId]
        }));
      };
      const handlecommentpost=(postId)=>{
        setHidecomment((prev) => ({
            ...prev,
            [postId]: !prev[postId]
          }));
        };
      
      const navieditpost=useNavigate();
      const editpost=(event,postpic,postbody)=>{
        console.log(postpic);
        navieditpost(`/editpost`, { state:{postid:event,postpic:postpic,postbody:postbody} });
      }
      const deletepost=async (event)=>{
        setuserstate(30);
        const response=await fetch(`${process.env.REACT_APP_APIURL}api/post/delete/${event}`,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':`${localStorage.getItem('token')}`,
            }
        })
        setuserstate(100);
        window.location.reload();
      }
      const deletecomment=async(event,event1)=>{
        setuserstate(30);
        const response=await fetch(`${process.env.REACT_APP_APIURL}api/post/removecomment/${event}?commentId=${event1}`,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':`${localStorage.getItem('token')}`,
            }
        })
        setuserstate(100);
        window.location.reload();
      }
      const handlesavepost=async (event)=>{
        setuserstate(30);
        const response =await fetch(`${process.env.REACT_APP_APIURL}api/post/handlesave/${event}`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`${localStorage.getItem('token')}`,
          },
        })
        setuserstate(100);
        postmore(event);
        window.location.reload();
      }
      const [expanded, setExpanded] = useState(false);

      const toggleExpansion = () => {
        setExpanded(!expanded);
      };
  return (
    <div style={{color:'white',background:'black',overflowY:'scroll',maxHeight:'100vh'}}> 
    <Routes>
<Route path="/profile" element={<Profile/>}></Route>
<Route path="/editpost" element={<Editpost/>}></Route>
</Routes>
<LoadingBar
        color='#f11946'
        progress={userstate}
      />
<div>
<nav className="navbar bg-body-tertiary" data-bs-theme="dark">
   <div className="d-flex" >
  
    <div><a href="/////***"  style={{width:'5%',textDecoration:'none',color:'white'}} onClick={gotoone}><h1 style={{margin:'5px'}}>&larr;</h1></a>  </div> 
    <div style={{marginTop:'11px'}}><Link className="navbar-brand" style={{fontWeight:'bold'}} to="/profile"> {state.username}</Link></div>
   </div>
 </nav>
 </div>
 
 
<div className="d-flex-xl-column align-items-center justify-content-center" style={{}}>
 
    {posts.map((element, index) => (
     <div>
        <div className="d-flex-xl-column align-items-center justify-content-center" id="allpostone" style={{ position: 'relative',marginTop:'15%'}}>
            <div class="d-flex aligns-items-center justify-content-between " style={{marginBottom:'2%'}}>
                <div class="d-flex" style={{width:'100%',marginLeft:'1vw'}}>
            <img src={state.userpic} className="card-img-top rounded-circle" alt="..." style={{width:'8.5vw',height:'8vw',margin:'1%',borderRadius: '50%',border: '2.5px solid transparent',backgroundImage: 'linear-gradient(to right, #ff8a00, #e52e71, #ff8a00)'}}></img>
            
            <h5 id="allpostusername" style={{fontWeight:'bold'}}>{state.username}</h5>
           
            </div>
           
            {(state.id!==localStorage.getItem('myid') &&  postid === element._id)===true?<div class="d-flex" style={{position:'absolute',right:5}}>
                   {element.saved.includes(localStorage.getItem('myid'))===false ? <div style={{margin:'2%',padding:'5%',cursor:'pointer'}}  onClick={()=>handlesavepost(element._id)}><img src={save} alt="" style={{height:'7vw',width:'7vw'}}></img></div>:<div style={{margin:'2%',padding:'5%',cursor:'pointer'}}  onClick={()=>handlesavepost(element._id)}><img src={unsave} alt="" style={{height:'7vw',width:'7vw'}}></img></div>}


                </div>:<div class="d-flex align-items-center" id="allpostmore" style={{cursor:'pointer',position:'absolute',right:5}} onClick={()=>postmore(element._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
</svg>
            </div>}
            </div>
            {more && state.id===localStorage.getItem('myid') &&  postid === element._id &&(
            <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 99999, background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', width: '70%', overflowY: 'auto' ,background:'black',color:'white',height:'30vw'}}>
                <button style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem',color:'white' }} onClick={postmore}>&times;</button>
                <div class="d-flex align-items-center justify-content-between" style={{margin:'5%',cursor:'pointer'}}>
             
<div style={{margin:'2%',borderRadius:'50%',borderStyle:'solid',borderWidth:'3px',padding:'5%',cursor:'pointer'}} onClick={()=>editpost(element._id,element.ImageURL,element.body)}>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>
</div>
<div style={{margin:'2%',borderRadius:'50%',borderStyle:'solid',borderWidth:'3px',borderColor:'red',padding:'5%',cursor:'pointer'}} onClick={()=>deletepost(element._id)}>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
</div>
</div>

                
                
                
                </div>)}
              
         
          <img src={element.ImageURL} id="allpostphoto" style={{width:'100%',objectFit:'fill',cursor:'pointer'}} alt="..." className="card-img-top"  />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', width:'100%', marginTop: '5px',marginLeft:'7px' }}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer',width:'10%' }} onClick={() => handleLike(element._id)}>
  {/* Content */}

      {/* Heart icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={(element.likes.includes(localStorage.getItem('myid'))) ? 'red' : 'none'}
        stroke={(element.likes.includes(localStorage.getItem('myid'))) ? 'red' : 'currentColor'}
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        height="28"
        style={{}}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.17l-1.41-1.41C5.61 15.9 2 12.25 2 8.5c0-2.5 2-4.5 4.5-4.5C9.64 4 11.07 5.11 12 6.64 12.93 5.1 14.36 4 16.5 4c2.5 0 4.5 2 4.5 4.5 0 3.75-3.61 7.4-8.59 11.26L12 21.17z" />
      </svg>
     {/* Heart icon */}
{hidelikecount[element._id] ? null : <span>{element.likes.length}</span>}

    
      
   
        </div>
        <div style={{marginLeft:'3vw'}}>
        <img src={hidecomment[element._id]?null:comment} alt="" style={{cursor:'pointer'}} id="allpostcomment" onClick={()=>handlecomment(element._id)}></img>
        </div>
       </div>
      
       {commentclicked&& !hidecomment[element._id] &&postid === element._id &&(
        <div style={{color:'white',background:'black'}}>
       <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', width: '100%', overflowY: 'auto', height: '80%',color:'white',background:'black' }}>
  <button style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem',color:'white' }} onClick={handlecomment}>&times;</button>
  <h1 style={{ marginLeft: '35%' }}>Comments</h1>
  <div className="comments-container" style={{ position: 'relative', width: '100%' }}>
    {element.comments.map((comment, commentindex) => (
      <div key={comment._id}>
        <div>
         
           <h5 style={{fontWeight:'bold'}}>{comment.username}</h5>
           
          
          <div class="d-flex align-items-center justify-content-between">
          <p style={{color:'grey'}}>{comment.comment}</p>
          {state.id===localStorage.getItem('myid')?(<button class="btn btn-danger" style={{borderStyle:'solid',borderColor:'black',borderWidth:'2px',marginTop:'-3vw'}} onClick={()=>deletecomment(element._id,comment._id)}>delete</button>):null}
          </div>
        </div>
      </div>
    ))}
    <div className="container" style={{ position: 'sticky',bottom:'0px',left:'-100px', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px', width: '100%', marginRight: '0px', position: 'relative' }} onChange={event => setnewcomment(event.target.value)}></textarea>
      <button className='btn btn-primary' style={{ margin: '2%' }} onClick={() => postcomment(element._id)} disabled={newcomment === "" ? true : false}>Post your Comment</button>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0)', zIndex: -1 }} />
    </div>
  </div>
</div>

   
  </div>
   
)}

    <div  style={{ color: 'grey', height: 'auto', marginBottom: '2vw',marginLeft:'7px' }}>
    <p style={{fontWeight:'bold',color:'white'}}>{state.username} :</p>
      <p style={{ height: expanded ? 'auto' : '1.75em', overflow: 'hidden' }}>{element.body}</p>
      {element.body.length > 80 && (
        <button onClick={toggleExpansion} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'grey' }}>
          ...........{expanded ? 'view less' : 'view more'}
        </button>
      )}
    </div>
    <div style={{marginLeft:'7px'}}>
   <Moment  to={element.updatedAt}>{new Date()+ ""}</Moment>
   </div>
      </div> 
      </div>
      
    ))}

  </div>


 </div>

  )
}








