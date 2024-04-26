import { useState } from "react";
import React from 'react'


const MakeUserProfile = () => {
    // Define states for form inputs
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [homeState, setHomeState] = useState('');
    const [country, setCountry] = useState('');
    const [dob, setDob] = useState('');
    const [game, setGame] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [team, setTeam] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // console.log({name, username, homeState, country, dob, game, role, status, team});
      };

    const handleProfileCreation = async (e) => {
        e.preventDefault();
        // console.log({name, username, homeState, country, dob, game, role, status, team});
        try {
            // Retrieve token from local storage
            const token = localStorage.getItem('token');

            // Check if token exists
            if (!token) {
                throw new Error('Token not found in local storage');
            }

            // Make request to loggedUser endpoint to fetch user ID
            const response = await fetch('http://localhost:8000/api/user/loggeduser', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            const userId = userData.user._id;

            // console.log(userData.user._id);

            // Now you have the userId, you can use it to make a request to the profile endpoint
            // Replace 'profile-url' with the actual URL of your profile endpoint
            const profileResponse = await fetch('http://localhost:8000/api/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    gameUserId: "@shimla",
                    name: name,
                    username: username,
                    homeState: homeState,
                    country: country,
                    dob: dob,
                    game: game,
                    role: role,
                    status: status,
                    team: team
                })
            });

            if (!profileResponse.ok) {
                throw new Error('Failed to save profile details');
            }

            const profileData = await profileResponse.json();
            // console.log('Profile details saved:', profileData);

        } catch (error) {
            console.error('Error:', error);
        }
    }




    return (
        <main className='flex flex-col px-[5rem] pt-[4rem]'>
            <h1 className='text-6xl text-center py-5'>User Profile</h1>
            {/* <div className="flex flex-col py-3 profile ">
                <h1 className='text-4xl text-left underline'>Profile Details</h1>
                <div className='flex items-center flex-wrap gap-[3rem] py-[1rem] rounded-lg'>
                    <div>
                        <div className='flex flex-col pb-[1rem]'>
                            <label htmlFor="name">Name</label>
                            <input type="text" id='name' className="py-1 px-2 rounded-md w-[200px] border border-black" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="username">Username</label>
                            <input type="text" id='username' className="py-1 px-2 rounded-md w-[200px] border border-black"/>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col  pb-[1rem]'>
                            <label htmlFor="home-state">State</label>
                            <input type="text" id='home-state' className="border border-black py-1 px-2 rounded-md w-[200px]" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="country">Country</label> 
                            <input type="text" id='country' className="border border-black py-1 px-2 rounded-md w-[200px]" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 py-3 personal-detaials">
                <h1 className='text-4xl text-left underline' >Personal Details</h1>
                <div className='flex flex-col'>
                    <label htmlFor="dob">DOB</label>
                    <input type="date" id='dob' className="border border-black py-1 px-2 rounded-md w-[200px]" />
                </div>
                <div className='flex items-center flex-wrap gap-[3rem] pb-[1rem]'>
                    <div>
                        <div className='flex flex-col pb-[1rem]'>
                            <label htmlFor="game">Game</label>
                            <input type="text" id='game' className="border border-black py-1 px-2 rounded-md w-[200px]" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="role">Role</label>
                            <input type="text" id='role' className="border border-black py-1 px-2 rounded-md w-[200px]" />
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col pb-[1rem]'>
                            <label htmlFor="status">Status</label>
                            <input type="text" id='status' className="border border-black py-1 px-2 rounded-md w-[200px]" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="team">Team</label>
                            <input type="text" id='team' className="border border-black py-1 px-2 rounded-md w-[200px]" />
                        </div>
                    </div>
                </div>           
            </div> */}
            <form onSubmit={handleProfileCreation}>
                <div className="flex flex-col py-3 profile ">
                    <h1 className='text-4xl text-left underline'>Profile Details</h1>
                    <div className='flex items-center flex-wrap gap-[3rem] py-[1rem] rounded-lg'>
                        <div>
                            <div className='flex flex-col pb-[1rem]'>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id='name'
                                    className="py-1 px-2 rounded-md w-[200px] border border-black"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id='username'
                                    className="py-1 px-2 rounded-md w-[200px] border border-black"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-col pb-[1rem]'>
                                <label htmlFor="home-state">State</label>
                                <input
                                    type="text"
                                    id='home-state'
                                    className="border border-black py-1 px-2 rounded-md w-[200px]"
                                    value={homeState}
                                    onChange={(e) => setHomeState(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    id='country'
                                    className="border border-black py-1 px-2 rounded-md w-[200px]"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 py-3 personal-detaials">
                    <h1 className='text-4xl text-left underline' >Personal Details</h1>
                    <div className='flex flex-col'>
                        <label htmlFor="dob">DOB</label>
                        <input
                            type="date"
                            id='dob'
                            className="border border-black py-1 px-2 rounded-md w-[200px]"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center flex-wrap gap-[3rem] pb-[1rem]'>
                        <div>
                            <div className='flex flex-col pb-[1rem]'>
                                <label htmlFor="game">Game</label>
                                <input
                                    type="text"
                                    id='game'
                                    className="border border-black py-1 px-2 rounded-md w-[200px]"
                                    value={game}
                                    onChange={(e) => setGame(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="role">Role</label>
                                <input
                                    type="text"
                                    id='role'
                                    className="border border-black py-1 px-2 rounded-md w-[200px]"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-col pb-[1rem]'>
                                <label htmlFor="status">Status</label>
                                <input
                                    type="text"
                                    id='status'
                                    className="border border-black py-1 px-2 rounded-md w-[200px]"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="team">Team</label>
                                <input
                                    type="text"
                                    id='team'
                                    className="border border-black py-1 px-2 rounded-md w-[200px]"
                                    value={team}
                                    onChange={(e) => setTeam(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </main>
    )
}

export default MakeUserProfile;