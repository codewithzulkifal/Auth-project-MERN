import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

function Authgoogle() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async() => {
        try {
        
            const provider = new GoogleAuthProvider()
            const  auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            // console.log(result);
            const res = await fetch('http://localhost:9999/api/user/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL,
            }),
        });
        const data = await res.json();
        console.log(data);
        dispatch(signInSuccess(data));
        navigate('/');

        } catch (error) {
            console.log("Not login with Google", error);
        }
    }

  return (
    <button type="button" onClick={handleGoogleClick} className=' text-white bg-purple-800 px-5 py-2 rounded-lg '>
        Conntinue with Google
    </button>
  )
}

export default Authgoogle
