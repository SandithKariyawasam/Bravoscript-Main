import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  getAdditionalUserInfo,
  deleteUser
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import axios from 'axios';
import './auth.css';

const firebaseConfig = {
  apiKey: "AIzaSyCNyKCyDS-SAY3pgWCTe3ZV56h6PbIXfkQ",
  authDomain: "rising-pen-456515-h8.firebaseapp.com",
  projectId: "rising-pen-456515-h8",
  storageBucket: "rising-pen-456515-h8.firebasestorage.app",
  messagingSenderId: "1002087414265",
  appId: "1:1002087414265:web:9acbce5d7fa5d3ad6da528",
  measurementId: "G-G6LLZ59Y3B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

const Auth = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const toggleView = (view) => {
    setIsLoginView(view === 'login');
    setLoginMessage("");
    setRegisterMessage("");
  };

  const handleRegister = async (providerName) => {
    setRegisterMessage("");
    try {
      let provider;
      if (providerName === 'google') provider = new GoogleAuthProvider();
      if (providerName === 'github') provider = new GithubAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { isNewUser } = getAdditionalUserInfo(result);

      if (isNewUser) {
        console.log("New user registered:", user.email);
        await sendTokenToBackend(user);
        alert("Registration Successful!");
      } else {
        setRegisterMessage("Account already exists! Please ");
      }

    } catch (error) {
      console.error("Registration Error:", error);
      setRegisterMessage("Registration failed. Try again.");
    }
  };

  const handleLogin = async (providerName) => {
    setLoginMessage("");
    try {
      let provider;
      if (providerName === 'google') provider = new GoogleAuthProvider();
      if (providerName === 'github') provider = new GithubAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { isNewUser } = getAdditionalUserInfo(result);

      if (isNewUser) {
        await deleteUser(user);
        setLoginMessage("Account not found. Please ");
      } else {
        console.log("Existing user logged in:", user.email);
        await sendTokenToBackend(user);
      }

    } catch (error) {
      console.error("Login Error:", error);
      setLoginMessage("Login failed. Try again.");
    }
  };

    const sendTokenToBackend = async (user) => {
      try {
        const idToken = await user.getIdToken();

        const response = await axios.post('https://bravoscript-main.vercel.app/api/auth/login', {
          idToken: idToken
        });

        const { role } = response.data;

        onLoginSuccess(role);

        onClose();

        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }

      } catch (error) {
        console.error("Backend Error:", error);
        alert("Failed to connect to server.");
      }
    };

    return (
      <>
        <div className="auth-overlay">
          <div className="auth-modal-wrapper">
            <div className="login-container">
              <div className="login-content">

                <button className="auth-close-btn" onClick={onClose}>&times;</button>

                {/* LOGIN SECTION */}
                {isLoginView && (
                  <div className="login">
                    <h1>Welcome Back</h1>

                    <button className="login-goo" onClick={() => handleLogin('google')}>
                      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
                      Continue with Google
                    </button>

                    <button className="login-git" onClick={() => handleLogin('github')}>
                      <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path></svg>
                      Continue with Github
                    </button>

                    <p style={{ color: loginMessage ? 'red' : 'inherit' }}>
                      {loginMessage || "Don't have an account?"} &nbsp;
                      <span onClick={() => toggleView('register')} style={{ cursor: 'pointer' }}>
                        Sign up now.
                      </span>
                    </p>
                  </div>
                )}

                {/* REGISTER SECTION */}
                {!isLoginView && (
                  <div className="register">
                    <h1>Join the Community</h1>
                    <h3>Create beautiful UI elements and share them with 100,000+ developers</h3>
                    <p>Create and share unlimited UI elements</p>
                    <p>Get inspiration from thousands of designs</p>
                    <p>Join a thriving community of creators</p>

                    <button className="login-goo" onClick={() => handleRegister('google')}>
                      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
                      Continue with Google
                    </button>

                    <button className="login-git" onClick={() => handleRegister('github')}>
                      <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path></svg>
                      Continue with Github
                    </button>

                    <p style={{ color: registerMessage ? 'red' : 'inherit' }}>
                      {registerMessage || "Already have an account?"} &nbsp;
                      <span onClick={() => toggleView('login')} style={{ cursor: 'pointer' }}>
                        Sign in.
                      </span>
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

      </>
    )
  }

  export default Auth;