import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleRegister = () => {
    if(!firstname || !lastname || !email || !password){
      toast.error('All fields required')
    }
    else if(password !== confirmPassword){
      toast.error("Passwords are not matching")
    }
    else{
      axios.post('http://localhost:8000/register', {firstname, lastname, email, password})
      .then(res => {
        if(res.data == 'Registered successfully'){
          toast.success(res.data)
          navigate('/login')

        }
        else if(res.data == 'User is already exists'){
          toast.error(res.data)
        }
        else{
          toast.error('Failed to register')
        }
      })
    }
    
  }

  return (
    <div className=' w-screen h-screen bg-gray-100 flex flex-col justify-center items-center'>
        <div className=' w-fit h-fit bg-white p-8 rounded-md'>
          <div>
            <h2 className=' font-bold text-2xl flex w-full justify-center items-center mb-3'>Register</h2>
          </div>
          <div className=' flex flex-col gap-2 mt-2'>
            <input type='text' value={firstname} onChange={e => setFirstname(e.target.value)} placeholder='firstname' className=' p-2 outline-none bg-gray-100 rounded-md w-72' />
            <input type='text' value={lastname} onChange={e => setLastname(e.target.value)} placeholder='lastname' className=' p-2 outline-none bg-gray-100 rounded-md w-72' />
            <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='email address' className=' p-2 outline-none bg-gray-100 rounded-md w-72' />
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='password' className=' p-2 outline-none bg-gray-100 rounded-md w-72' />
            <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='confirm password' className=' p-2 outline-none bg-gray-100 rounded-md w-72' />

          </div>
          <div>
            <button onClick={handleRegister} className=' w-72 bg-green-400 text-white mt-3 py-1 rounded-md font-semibold'>Register</button>
          </div>
          <div className=' mt-2'>
            <p>Already have an account? <a href='/login' className=' text-blue-500'>Login</a></p>
          </div>
        </div>
    </div>
  )
}

export default Register