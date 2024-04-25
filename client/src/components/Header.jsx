import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/");
    };

    return (
        <div className='fixed w-full bg-white'>
            <header className='h-[4rem] flex items-center justify-between px-[4rem] border border-b-1 border-[#ddd]'>
                <div className="logo text-[1.7rem] cursor-pointer hover:text-gray-700 hover:underline transition-all duration-300 ease-in-out">
                    AvatarArena
                </div>
                <div className="nav-items text-[1.2rem]">
                    <ul className='flex gap-[2rem] cursor-pointer '>
                        <li className='hover:text-gray-500 hover:underline transition-all duration-300 ease-in-out'>Profile</li>
                        <li className='hover:text-gray-500 hover:underline transition-all duration-300 ease-in-out'>Dashboard</li>
                    </ul>
                </div>
                <div className='singup-login text-[1.2rem]'>
                    <ul className='cursor-pointer'>
                        {isLoggedIn ? (
                            // If user is logged in, display logout button
                            <li>
                                <button className='hover:text-gray-500 hover:underline transition-all duration-300 ease-in-out' onClick={handleLogout}>Logout</button>
                            </li>
                        ) : (
                            // If user is not logged in, display signup and login buttons
                            <ul className='flex gap-[1.5rem]'>
                                <li>
                                    <a href="/" className='hover:text-gray-500 hover:underline transition-all duration-300 ease-in-out'>Signup</a>
                                </li>
                                <li>
                                    <a href="/login" className='hover:text-gray-500 hover:underline transition-all duration-300 ease-in-out'>Login</a>
                                </li>
                            </ul>
                        )}
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Header;