import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = () => {
    console.log(email, password);
    axios.post('http://localhost:8000/login', {email, password})
    .then(res => {
      if(res.data.message == 'Login success'){
        toast.success('Login success')
        localStorage.setItem('mernstackToken', res.data.token)
        navigate('/home')
      }
      else{
        toast.error(res.data)
      }
    })
    
  }

  return (
    <div className=' w-screen h-screen flex justify-center items-center bg-gray-100'>
        <div className=' w-fit h-fit bg-white p-8 rounded-md'>
          <div>
            <h2 className=' font-bold text-2xl flex w-full justify-center items-center mb-3'>Login</h2>
          </div>
          <div className=' flex flex-col gap-2 mt-2'>
            <input type='email' value={email} onChange={e=> setEmail(e.target.value)} placeholder='email address' className=' p-2 outline-none bg-gray-100 rounded-md w-72' />
            <input type='password' value={password} onChange={e=> setPassword(e.target.value)} placeholder='password' className=' p-2 outline-none bg-gray-100 rounded-md w-72' />

          </div>
          <div>
            <button onClick={handleLogin} className=' w-72 bg-green-400 text-white mt-3 py-1 rounded-md font-semibold'>Login</button>
          </div>

          <div className=' mt-2'>
            <p>Dont have an account? <a href='/register' className=' text-blue-500'>Register</a></p>
          </div>
        </div>
    </div>
  )
}

export default Login