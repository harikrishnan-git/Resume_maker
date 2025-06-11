import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin=async()=>{
        try{
            const res = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');
            console.log('Logged in!', data);
        }
        catch(error){
            console.error('Login error:', error);
            alert(error.message || 'Login failed');
        }
    }
  return (
    <div className='login-page'>
        <h2>Login</h2>
        <div className='email'>
            <label htmlFor="email">Email</label>
            <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='password'>
            <label htmlFor="name">Password</label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button onClick = {handleLogin}>Login</button>
    </div>
  )
}
