import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { context, server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {

const {isAuthenticated,setisAuthenticated,loading,setloading}=useContext(context);

const logoutHandler = async () => {
  setloading(true);

  try {
      await axios.get(
      `${server}/users/logout`,
      
      {
    
        withCredentials: true,
      }
    );

    toast.success("Logged Out Successfully");
    setisAuthenticated(false);
    setloading(false);
  } catch (error) {
    toast.error(error.response.data.message);
    setisAuthenticated(true);
    setloading(false);
  }
};







  return (
    <nav className='header'>
        <div>
            <h2>ToDo App.</h2>
        </div>
        <article>
       <Link to={"/"}>Home</Link>
       <Link to={"profile"}>Profile</Link>
       {
        isAuthenticated?<button disabled={loading} onClick={logoutHandler} className='btn'>LogOut</button>:<Link to={"login"}>LogIn</Link>
       }
       
       

        </article>
    </nav>
    

  )
}

export default Header