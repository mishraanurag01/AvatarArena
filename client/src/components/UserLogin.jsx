import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // navigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch('http://localhost:8000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const response = await data.json();
      console.log(response);

      if (data.status === 422) {
        // Login successful, redirect or perform desired actions
        alert('all fields are required');
      } else if(data.status === 400) {
        alert('Login failed! You are not a registered User');
      }
      else if(data.status === 406){
        alert("Email or password is not Valid")
      }
      else{
        localStorage.setItem('token', response.token);
        const num = localStorage.getItem('token');
        if(num) console.log("token is set:", num);
        else console.log("token not set");
        alert("login successful")
        navigate("/profile")
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="max-w-md w-full">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">Login</button>
      </form>
      <p>Not a registered User?? <Link className='text-blue-600' to="/" >Register</Link></p>
    </div>
  );
};

export default UserLogin;
