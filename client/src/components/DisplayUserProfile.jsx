import React from 'react'
import '../App.css'

const DisplayUserProfile = async() => {
        try {
            const response = await fetch('http://localhost:8000/api/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('cannot fetch user profile data');
            }
            const userData = await response.json();
            const {userId} = userData.userId;
            const {gameUserId} = userData.gameUserId;
            const {username} = userData.username ;
            const {homeState} = userData.homeState;
            const {country} = userData.country;
            const {dob} = userData.dob;
            const {game} = userData.game;
            const {role} = userData.role;
            const {status} = userData.status;
            const {team} = userData.team;
        }
        catch (error) {
            console.error('Error:', error);
        }
    return (
    <>
      <div className='info'>
      <div className='profile'>
      <img src="" alt="" />
      <h1>{userId}</h1>
      </div>
      <h2></h2>
      <div className='location'>
        <img className='flag' src="" alt="" />
        <div className='state'>{homeState}</div>
        <div className='country'>{country}</div>
      </div>
      </div>
      <div className="card">
        <div className='part1'>
        <div className='line'>
          <div className='bold'>
            Born
          </div>
          <div>
            {dob}
          </div>
        </div>
        <div className='line'>
          <div className='bold'>
            Games
          </div>
          <div>
            {game}
          </div>
        </div>
        <div className='line'>
          <div className='bold'>
            Role
          </div>
          <div>
            {role}
          </div>
        </div>
        <div className='line'>
          <div className='bold'>
            Status
          </div>
          <div>
            {status}
          </div>
        </div>
        <div className='line'>
          <div className='bold'>
            Teams
          </div>
          <div>
            {team}
          </div>
        </div>
        </div>
        <div className='part2'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat itaque velit expedita consectetur cupiditate blanditiis cum animi ratione. Aperiam ab voluptas, ad laudantium consequuntur, tenetur aut non eaque similique molestiae, commodi volupta
        </div>
      </div>
    </>
    )
}

export default DisplayUserProfile ;