import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Authgoogle from '../Components/Authgoogle'

const SignUp = () => {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value })
  }
  // console.log(formData);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      setLoading(true)
      setError(false)
      const res = await fetch('http://localhost:9999/api/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data);
      setLoading(false);
      if(data.success === false){
        setError(true)
        return;
      }
      navigate("/")
    } catch (error) {
      setLoading(false);
      setError(true);
    }

  };



  return (
    <>
    <div>
    <h1 className=' text-2xl font-semibold text-center mb-8 mt-20 '>Sign Up</h1>
    <form action="" onSubmit={handleSubmit} className=' flex flex-col gap-10 justify-center items-center ' >
      <input type="text"
        id='username' 
        placeholder="Enter your username"
        onChange={handleChange}
        className='border border-gray-500 rounded-md p-2 ' 
        />
        <input type="email"
        id='email' 
        placeholder="Enter your email"
        onChange={handleChange}
        className='border border-gray-500 rounded-md p-2 '
        />
        <input type="password"
        id='password' 
        placeholder="Enter your password"
        onChange={handleChange} 
        className='border border-gray-500 rounded-md p-2 '
        />
      <button disabled={loading} type="submit" className=' bg-green-600 p-2 text-white active:scale-95 transition-all duration-300 rounded-lg' >
        {loading ? 'loading ...' : 'SignUp'}
      </button>
      <Authgoogle/>
    </form>

    <div className=' flex justify-center gap-2 mt-5 s'>
       <p>Have an account?</p>
        <Link to='/signin'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
    </div>
     <p className='text-red-700 mt-5'>{error ? error.message || "Something went wrong" : '' }</p>
    </div>
    </>
  )
}

export default SignUp