import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
const Home = () => {

  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  const checkforUser = async() => {
    const token = await localStorage.getItem('mernstackToken')
    
    if(!token){
      navigate('/login')
    }
    else{
        axios.post('http://localhost:8000/get-user', {token})
        .then(res => {
            setUserData(res.data);
            
        })
        toast.success('user is loggedin')
    }
  }

  const logOut = async() => {
    await localStorage.removeItem('mernstackToken')
    checkforUser()
  }

  useEffect(() => {
    checkforUser()
  }, [])

  return (
    <div className=' w-screen h-screen flex justify-center items-center'>
      <div >
        <h1 className=' font-bold text-3xl'>Hello {userData?.firstname} {userData?.lastname}</h1>
        <button onClick={logOut} className=' bg-red-500 p-2 px-5 text-white flex justify-center items-center w-full mt-5'>Logout</button>
      </div>
    </div>
  )
}

export default Home