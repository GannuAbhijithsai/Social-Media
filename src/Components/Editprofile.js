import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import {Routes,Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Profile from './Profile';
import LoadingBar from 'react-top-loading-bar';
export default function Editprofile() {
    const [usernam,setusernam]=useState("");
    const [nam,setnam]=useState("");
    const [userstate,setuserstate]=useState(0);
    const [bio,setbio]=useState("");
    const [username,setusername]=useState("");
    const [name,setname]=useState("");
    const [userpic,setuserpic]=useState("");
    const [useremail,setuseremail]=useState("");
    const [email,setemail]=useState("");
    const [userbio,setuserbio]=useState("");
    const [pic,setpic]=useState(null);
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
        setusername(data.user.username);
        setname(data.user.name);
        setuserbio(data.user.bio);
        setemail(data.user.email);
        //const imageUrl = URL.createObjectURL(data.user.Photo);
        setuserpic(data.user.Photo)
      console.log(response);
    };
    
            
        
          
        
   
    
 /* const profilepic = async ()=>{
    const response = await fetch(`https://instagram-clone-dlhm.onrender.com/api/user/profilePic/${localStorage.getItem('myid')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
      });
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
    
    setuserpic(imageUrl);
      //console.log(response);
  };*/
  useEffect(() => {
 
    const fetchData = async () => {
      await fetchUserProfile();
    //  await profilepic();
    };

    fetchData();
  }, []);
  const naviprofile= useNavigate();
  const onhandle=async()=>{
    setuserstate(20);
    const updatedName = nam !== "" ? nam : name;
    const updateuserName=usernam !==""?usernam:username;
    const updateuseremail=useremail !==""?email:useremail;
    const updatepic=pic!==null?pic:userpic;
    const formData = new FormData();
formData.append('pic', updatepic);
        const response = await fetch(`${process.env.REACT_APP_APIURL}api/user/updateProfile/${localStorage.getItem('myid')}`, {
              method: 'PUT',
              headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({ "username":updateuserName,
                "name":updatedName,
                "email":updateuseremail,
            
            })
              
                        
            });
            const data = await response.json();
            console.log(data);
            
   setuserstate(40);
    const responses = await fetch(`${process.env.REACT_APP_APIURL}api/user/uploadProfilePic`, {
              method: 'PUT',
              headers: {
               
               
                'Authorization': `${localStorage.getItem('token')}`,
              },
              body:  formData
        
              
                        
            });
            setuserstate(70);
            const uploadData = await responses.json();
            console.log(formData);
    console.log(uploadData);
    setuserstate(100);
    goto();
        
  }
  const goto=()=>{
    naviprofile(`/profile`, {});
  }
  const onFileChange =  (file) => {

    setuserpic(URL.createObjectURL(file));
   setpic(file);
           
  };
  return (
    <div style={{color:'white',background:'black',overflowY:'scroll',maxHeight:'100vh'}}>
      <Routes>
        <Route path="/profile" element={<Profile/>}></Route>
    </Routes>
    <LoadingBar
        color='#f11946'
        progress={userstate}
      />
    <div>
      <a href="/////***"  style={{width:'5%',textDecoration:'none',color:'black'}} onClick={goto}><h1 style={{margin:'5px', color:'white'}}>&larr;</h1></a>
    </div>
    <h1 style={{fontWeight:'bold',marginLeft:'43%'}}>Edit profile</h1>
    <div className="container">
    <h4 style={{ marginLeft: '43%' }}>Profile Picture</h4>
    <div style={{width: "14rem",border:'none',marginLeft:'43%',marginTop:'20px'}}>
  <img src={userpic} className="card-img-top rounded-circle" alt="..." style={{width:"10rem",height:"10rem",borderRadius: '50%',border: '2.5px solid transparent',backgroundImage: 'linear-gradient(to right, #ff8a00, #e52e71, #ff8a00)'}}/>
 
  </div>
        <input type="file" accept="image/*" onChange={event=>onFileChange(event.target.files[0])} style={{marginLeft:'43%',marginTop:'5px'}} />
        <h4 style={{marginLeft:'2%'}}>Name</h4>
    <input type="text" className="form-control" style={{margin:'2%'}} placeholder={name} onChange={event => setnam(event.target.value)} aria-label="Username" aria-describedby="basic-addon1"/>
    <h4 style={{marginLeft:'2%'}}>Username</h4>
    <input type="text" className="form-control" style={{margin:'2%'}} placeholder={username} onChange={event => setusernam(event.target.value)} aria-label="Username" aria-describedby="basic-addon1"/>
    <h4 style={{marginLeft:'2%'}}>Bio</h4>
    <input type="text" className="form-control" style={{margin:'2%'}} placeholder={bio} onChange={event => setuserbio(event.target.value)} aria-label="Username" aria-describedby="basic-addon1"/>
    <h4 style={{marginLeft:'2%'}}>Email</h4>
    <input type="text" className="form-control" style={{margin:'2%'}} placeholder={email} onChange={event => setuseremail(event.target.value)} aria-label="Username" aria-describedby="basic-addon1"/>

   

    </div>
    <div className="d-flex align-items-center justify-content-center">
    <button type="button" onClick={onhandle} style={{width:'15%',textDecoration:'none',color:'black',width:'30vw'}} className="btn btn-primary">Save Changes</button>
    
    </div>
    </div>
  )
}
