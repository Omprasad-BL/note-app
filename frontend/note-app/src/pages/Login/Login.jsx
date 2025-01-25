import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import PasswordInput from '../../components/input/PasswordInput'
import { validateEmail } from '../../utils/Helper.js'
import axiosInstance from '../../utils/axiosInstance.js'
import axios from 'axios'
const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(null)

  const navigate=useNavigate();

  const handleLogin= async(e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return;
    }
    if(!password){
      setError("Please enter a password")
      return;
    }
    setError("")

    // LOGIN  API CALL
     try {
      const response = await axiosInstance.post("/login",{
        email:email,
        password:password 
      })
      if(response.data&& response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate('/dashboard')
      }
     } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }
      else{
        console.log(error);

        setError("An unexpected error occurred. Please try again")
      }
     }
  }
  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form action=" " onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>
          <input type="text" name="" id="" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className='input-box'/>
          <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>
          {error && <p className='text-red-500 text-5xs pb-1 '>
            {error}
          </p>}
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
