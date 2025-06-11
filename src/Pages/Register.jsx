import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleRegister = async() => {
        try {
        const res = await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name,email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');

        console.log('Registered!', data);
            navigate('/login')
        } catch (error) {
        console.error('Registration error:', error);
        alert(error.message || 'Registration failed');
        }
    }
  return (
    <div className='register-page'>
      <h2>Register</h2>
      <div className='username'>
        <label htmlFor="name">Name</label>
        <input type="text" onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className='email'>
        <label htmlFor="email">Email</label>
        <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className='password'>
        <label htmlFor="password">Password</label>
        <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <button onClick={handleRegister}>Register User</button>
    </div>
  )
}
