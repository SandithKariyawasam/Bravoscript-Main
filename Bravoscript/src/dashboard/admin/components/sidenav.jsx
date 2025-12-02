import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth"; 
import { auth } from '../../../firebase'; // Import the shared auth instance
import './sidenav.css';

const Sidenav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Sign out from Firebase
      await signOut(auth);

      // 2. Clear local storage (removes the role)
      localStorage.removeItem('userRole');

      // 3. Redirect to Home (or refresh the page to update App.js state)
      navigate('/');
      
      // Optional: Force a reload to ensure App.js state clears immediately
      window.location.reload(); 

    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
        <div className="side-menu">
          
          <button className='side-item'>
            <span><Link to="/admin/dashboard/">Dashboard</Link></span>
          </button>
          <button className='side-item'>
            <span><Link to="/admin/dashboard/create">Create</Link></span>
          </button>
          <button className='side-item'>
            <span><Link to="/admin/dashboard/users">Users</Link></span>
          </button>
          <button className='side-item'>
            <span><Link to="/admin/dashboard/myprofile">My Account</Link></span>
          </button>
          
          {/* Add onClick handler to the logout button */}
          <button className='side-item' onClick={handleLogout}>
            <span style={{color:"red"}}>Logout</span>
          </button>
        </div>
    </>
  )
}

export default Sidenav;
