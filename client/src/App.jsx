import './App.css'
import UserLogin from "./components/UserLogin";
import Register from './components/Register';
import MakeUserProfile from './components/MakeUserProfile';

import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' Component={Register}/>
        <Route path='/login' Component={UserLogin}/>
        <Route path="/profile" Component={MakeUserProfile} />
      </Routes>
      {/* <SignUp /> */}
    </>
  )
}

export default App
