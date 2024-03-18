import './App.css';
import {Routes,Route} from "react-router-dom";
import Editprofile from './Components/Editprofile';
import Searchedprofile from './Components/Searchedprofile';
import Deleteprofile from './Components/Deleteprofile';
import Followers from './Components/Followers';
import Following from './Components/Following';
import Signup from './Components/Signup';
import React from 'react'
import Profile from './Components/Profile';
import Login from './Components/Login';
import Forgotpasswordpage from './Components/Forgotpasswordpage';
import Changepasswordpage from './Components/Changepasswordpage';
import Otppage from './Components/Otppage';
import Createpost from './Components/Createpost';
import Allpost from './Components/Allpost';
import Editpost from './Components/Editpost';
import Savedpost from './Components/Savedposts';
import Homepage from './Components/Homepage';


function App() {
 
  return ( 
    <>
   
    
    <Routes>
  
   <Route path="/forgot" element={<Forgotpasswordpage/>}></Route>
   <Route path="/otp" element={<Otppage/>}></Route>
   <Route path="/change" element={<Changepasswordpage/>}></Route>
  <Route path="/edit" element={<Editprofile/>}></Route>
    <Route path="/search" element={<Searchedprofile/>}></Route>
    <Route path="/deleteaccount" element={<Deleteprofile/>}></Route>
    <Route path="/followers" element={<Followers/>}></Route>
    <Route path="/following" element={<Following/>}></Route>
    <Route path="/" element={<Signup/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/createpost" element={<Createpost/>}></Route>
    <Route path="/allpost" element={<Allpost/>}></Route>
    <Route path="/editpost" element={<Editpost/>}></Route>
    <Route exact path="/savedpost" element={<Savedpost/>}></Route>
    <Route path="/Home" element={<Homepage/>}></Route>
   
</Routes>

    </>
  )
}

  
  


export default App;
