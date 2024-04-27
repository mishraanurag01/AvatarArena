import './App.css'
import UserLogin from "./components/UserLogin";
import Register from './components/Register';
import MakeUserProfile from './components/MakeUserProfile';
import DisplayGameCards from './components/DisplayGameCards';
import Display from './components/Display';

import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' Component={Register} />
        <Route path='/login' Component={UserLogin}/>
        <Route path="/profile" Component={MakeUserProfile} />
        <Route path="/dashboard" Component={DisplayGameCards} />
        <Route path="/display" Component={Display} />
      </Routes>
    </>
  )
}

export default App
