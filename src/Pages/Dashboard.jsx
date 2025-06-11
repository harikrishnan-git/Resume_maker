import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const userId = localStorage.getItem("userId");
    console.log(userId)
    const [username,setUserName] = useState('');
    useEffect(()=>{
        const fetchUserName = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/user/${userId}`);
                const data = await res.json();
                if (res.ok) {
                setUserName(data.name); 
                } else {
                console.error(data.error);
                }
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
            };

    if (userId) {
      fetchUserName();
    }
    },[userId])
  return (
    <div>
      <Link to='/resume'>Create Resume</Link>
      <h1>Dashboard</h1>
      <p>Hello {username}</p>
    </div>
  )
}
