import Navbar from "../Navbar"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
  const navigate = useNavigate()
  const [userInfo, setUserinfo] = useState(null);

  //Get user info
  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get("/get-user");
      // set user info if user if exists
      if (response.data && response.data.user){
        setUserinfo(response.data.user)
      }
    }
    catch(error){
      if (error.response === 401){
        //clear local storage
        localStorage.clear();
        navigate('/login'); //redirect to login
      }
    }
  }

  useEffect(()=>{
    getUserInfo();

    return () => {}
  },[])

  return (
    <div>
      <Navbar userInfo={userInfo}/>
    </div>
  )
}

export default Home
