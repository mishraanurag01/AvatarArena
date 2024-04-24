import React from 'react'
import { useEffect, useState } from 'react';

const DisplayGameCards = () => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfileInfo = async () => {
            try {
                // Retrieve the auth token from local storage
                const authToken = localStorage.getItem('token');

                // Call the /loggeduser endpoint with the auth token
                const loggedUserResponse = await fetch('http://localhost:8000/api/user/loggeduser', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                // Extract the user ID from the logged user response
                const loggedUserData = await loggedUserResponse.json();
                const userId = loggedUserData.user._id;
                // console.log(userId)

                // Call the /get-user-game-profiles endpoint with the user ID
                const userGameProfilesResponse = await fetch('http://localhost:8000/api/user/get-user-game-profiles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId:userId})
                });

                // Extract the game profiles from the user game profiles response
                const userGameProfilesData = await userGameProfilesResponse.json();
                const gameProfiles = userGameProfilesData.gameProfiles;
                // console.log(gameProfiles);

                // Call the /get-game-profile endpoint for each game profile
                const gameProfileCards = await Promise.all(gameProfiles.map(async (gameProfileId) => {
                    const gameProfileResponse = await fetch(`http://localhost:8000/api/user/get-game-profile?gameProfileId=${gameProfileId}`);
                    const gameProfileData = await gameProfileResponse.json();
                    return gameProfileData; // Return the game profile data
                }));

                // Set the retrieved game profile cards to state
                // console.log(gameProfileCards)
                setUserProfile(gameProfileCards);
            } catch (error) {
                console.error('Error fetching user profile info:', error);
            }
        };

        // Call the fetchUserProfileInfo function when the component mounts
        fetchUserProfileInfo();
    }, []);

    // console.log(userProfile);

    return (
        <div className='px-[4rem]'>
            <div className='text-5xl text-center pt-[3rem] pb-[4rem]' >Game Cards</div>
            <div className='flex gap-[2rem] flex-wrap cursor-pointer'>
                {userProfile && userProfile.length > 0 ? (
                    userProfile.map((profile, index )=> (
                        <div key={index+1} className="py-5 px-7 bg-[#ddd] w-max mb-[2rem] rounded-xl">
                            <div className="flex items-center gap-[1rem]">
                                <div className='w-[3rem] h-[3rem] rounded-[50%] bg-gray-600 hover:scale-105 transition-transform'>
                                    <img src="" alt="" />
                                </div>
                                <div>
                                    <h1 className='text-2xl' >{profile.name}</h1>
                                    <h2>{profile.username}</h2>
                                </div>
                            </div>
                            <div className='flex gap-2 pt-2 pl-2'>
                                <p>{profile.homeState},</p>
                                <p>{profile.country}</p>
                            </div>
                            <div className='pl-2'>
                                <p><span className='text-gray-700' >Game : </span> <span className='text-black pl-1' >{profile.game}</span></p>
                            </div>
                            <div className='pl-2'>
                                <p><span className='text-gray-700' >Role : </span> <span className='text-black pl-1' >{profile.role}</span></p>
                            </div>
                            <div className='pl-2'>
                                <p><span className='text-gray-700' >Status : </span> <span className='text-black pl-1' >{profile.status}</span></p>
                            </div>
                        </div>
                    ))
                ):
                (
                    <div className="grid w-full place-items-center h-[50vh]">
                        <div>
                            <p className='text-3xl text-center'>No game cards to display</p>
                            <p className='text-center'>Add game cards from <i>/profile</i> section</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DisplayGameCards;