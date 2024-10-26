import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/Signup"
import Home from "./pages/Home/Home"


export default function App() {
  return (
    <div>
    
        <Routes>
          <Route path='/' exact element={<Root/>} />
          <Route path='/dashboard' exact element={<Home/>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/signup' exact element={<SignUp/>} />
        </Routes>

    </div>
  )
}

//define the root component to handel the initial redirect
const Root = ()=> {
  // Check if token exists in localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated otherwise login
  return isAuthenticated ? ( <Navigate to='/dashboard'/> ) : (<Navigate to='/signup'/>)
}
