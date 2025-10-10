import React, { createContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({children}) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const profilePic = 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80';


  // build payloads at request time and normalize email to avoid case/whitespace mismatches


  const navigate = useNavigate();

  const login = async () =>{

    try{

      const loginInputs = {email: email.trim().toLowerCase(), password: password}
      const res = await axios.post('http://localhost:6001/login', loginInputs);
      console.log('login response', res);
      localStorage.setItem('userToken', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
      localStorage.setItem('username', res.data.user.username);
      localStorage.setItem('email', res.data.user.email);
      localStorage.setItem('profilePic', res.data.user.profilePic);
      localStorage.setItem('posts', res.data.user.posts);
      localStorage.setItem('followers', res.data.user.followers);
      localStorage.setItem('following', res.data.user.following);
      navigate('/');

    }catch(err){
        // better error visibility in dev
        console.error('Login error:', err.response?.data || err.message);
    }
  }

  const register = async () =>{

    try{
        const payload = { username: username, email: email.trim().toLowerCase(), password: password, profilePic };
        const res = await axios.post('http://localhost:6001/register', payload);
        localStorage.setItem('userToken', res.data.token);
        localStorage.setItem('userId', res.data.user._id);
        localStorage.setItem('username', res.data.user.username);
        localStorage.setItem('email', res.data.user.email);
        localStorage.setItem('profilePic', res.data.user.profilePic);
        localStorage.setItem('posts', res.data.user.posts);
        localStorage.setItem('followers', res.data.user.followers);
        localStorage.setItem('following', res.data.user.following);  
        navigate('/');

    }catch(err){
        console.error('Register error:', err.response?.data || err.message);
    }
  }



  const logout = async () =>{
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    
    navigate('/landing');
  }



  return (
    <AuthenticationContext.Provider value={{login, register, logout, username, setUsername, email, setEmail, password, setPassword }} >{children}</AuthenticationContext.Provider>
  )
}

export default AuthenticationContextProvider