import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import {Link} from 'react-router-dom'
import PasswordInput from '../../components/input/PasswordInput'
const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(null)

  const handleLogin= async(e)=>{
    e.preventDefault();
  }
  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form action=" " onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>
          <input type="text" name="" id="" placeholder='Email' className='input-box'/>
          <PasswordInput/>
          <button type='submit' className='btn-primary'>Login</button>
          <p className=' text-sm text-center mt-4 '>
            Not Registered yet? { " "}
          <Link to="/signup" className=" font-medium text-primary underline">Create an Account</Link>
          </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
