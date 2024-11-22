import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import Authgoogle from '../Components/Authgoogle'

const SignIn = () => {

  const [formData, setFormData] = useState({})

  const {loading, error} = useSelector((state) => state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value })
  }
  // console.log(formData);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      dispatch(signInStart())
      const res = await fetch('http://localhost:9999/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(signInFailure(data))
        return;
      }
      dispatch(signInSuccess(data))
      navigate("/")
    } catch (error) {
      dispatch(signInFailure(error))
    }

  };

  return (
    <>
     <div>

    <h1 className=' text-2xl font-semibold text-center m-8 mt-20 '>Sign In</h1>
    <form action="" onSubmit={handleSubmit} className=' flex flex-col gap-10 justify-center items-center ' >
      <input type="text"
        id='username' 
        placeholder="Enter your username"
        onChange={handleChange}
        className='border border-gray-500 rounded-md p-2 ' 
        />
        {/* <input type="email"
        id='email' 
        placeholder="Enter your email"
        onChange={handleChange}
        className='border border-gray-500 rounded-md p-2 '
        /> */}
        <input type="password"
        id='password' 
        placeholder="Enter your password"
        onChange={handleChange} 
        className='border border-gray-500 rounded-md p-2 '
        />
      <button disabled={loading} type="submit" className=' bg-green-600 p-2 text-white active:scale-95 transition-all duration-300 rounded-lg' >
        {loading ? 'loading ...' : 'SignIn'}
      </button>
      <Authgoogle/>
    </form>

    <div className=' flex justify-center gap-2 mt-5 s'>
       <p>Don’t Have an account?</p>
        <Link to='/signup'>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
    </div>
     <p className='text-red-700 mt-5'>
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
    </div>
    </>
  )
}

export default SignIn