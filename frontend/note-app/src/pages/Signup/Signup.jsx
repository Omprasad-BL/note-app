import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import PasswordInput from "../../components/input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance.js'
import { validateEmail } from "../../utils/Helper";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate= useNavigate()
  const handleSignUp =async (e) => {
    e.preventDefault();

    // Call your API here with the form data

    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");

     // SIGN-UP  API CALL
     try {
      const response = await axiosInstance.post("/create-account",{
        fullName:name,
        email:email,
        password:password 
      })
      if(response.data&& response.data.error){
       setError(response.data.error)
       return
      }

      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate("/dashboard")
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
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28 ">
        <div className="w-96 border rounded bg-white px-7 py-10 ">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>
            <input
              type="text"
              placeholder="Name"
              value={name}
              className="input-box"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              value={email}
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput 
            value={password} 
              onChange={(e)=>setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
