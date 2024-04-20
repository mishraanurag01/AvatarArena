import './App.css'
import Login from "./components/Login";
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' Component={Register}/>
        <Route path='/login' Component={Login}/>

      </Routes>
      {/* <SignUp /> */}
    </>
  )
}

export default App
