import React,{useEffect} from 'react'
import { useLocation } from 'react-router-dom';
export default function Deleteprofile() {
    const location = useLocation();
  const { state } = location;
  
useEffect(() => {
     const deletep=async ()=>{
         let response=await fetch(`${process.env.REACT_APP_APIURL}api/user/search/delete/${localStorage.getItem('myid')}`,{
            method:'DELETE',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`,
              },
              
         })
     }
    
      return () => {
       deletep();
      }
    }, [])
    
  return (
    <>
    
    </>
  )
}
