import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import './App.css'

import Header from './components/header'
import Footer from './components/footer'

// ... import your pages ...
import Home from './pages/home/home'
import Details from './pages/details/details'
import About from './pages/about/about'
import Community from './pages/community/community'
import Contact from './pages/contactus/contactus'
import Icons from './pages/icons/icons'
import Templates from './pages/templates/templates'

import Auth from './dashboard/Auth/auth'
import User from './dashboard/user/index'
import Admin from './dashboard/admin/index'

function App() {
  const [showAuth, setShowAuth] = useState(false);


  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);

  const ProtectedRoute = ({ children, allowedRoles }) => {

    if (!userRole) {
      return <Navigate to="/" replace />;
    }


    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }


    return children;
  };

  return (
    <BrowserRouter>
      <Header
        onOpenAuth={() => setShowAuth(true)}
        userRole={userRole}
      />

      {showAuth && (
        <Auth
          onClose={() => setShowAuth(false)}
          onLoginSuccess={(role) => {
            setUserRole(role);
            localStorage.setItem('userRole', role);
            setShowAuth(false); 
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/community" element={<Community />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/components" element={<Icons />} />
        <Route path="/about" element={<About />} />
        <Route path="/templates" element={<Templates />} />

        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <User />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App