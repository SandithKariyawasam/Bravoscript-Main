import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase';
import './sidenav.css';

import defaultUserImage from '../../../assets/images/user.jpg';

const Sidenav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profileImage, setProfileImage] = useState(defaultUserImage);

  const isActive = (path) => (location.pathname === path ? "isActive" : "");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.photoURL) {
        setProfileImage(currentUser.photoURL);
      } else {
        setProfileImage(defaultUserImage);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userRole');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="side-menu">

        <button className='side-item'>
          <span><Link to="/admin/dashboard/" id={isActive("/admin/dashboard/")}>Dashboard</Link></span>
        </button>
        <button className='side-item'>
          <span><Link to="/admin/dashboard/create" id={isActive("/admin/dashboard/create")}>Create</Link></span>
        </button>
        <button className='side-item'>
          <span><Link to="/admin/dashboard/users" id={isActive("/admin/dashboard/users")}>Users</Link></span>
        </button>
        <button className='side-item'>
          <span><Link to="/admin/dashboard/myprofile" id={isActive("/admin/dashboard/myprofile")}>My Account</Link></span>
        </button>

        <button className='side-item' onClick={handleLogout}>
          <span style={{ color: "red" }}>Logout</span>
        </button>

        {/* 5. Update src to use the dynamic state variable */}
        <img
          src={profileImage}
          alt='User Profile'
          style={{ height: '60px', borderRadius: '50%', marginLeft: '600px' }}
        />
      </div>
    </>
  )
}

export default Sidenav;