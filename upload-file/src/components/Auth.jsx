import './style.css'
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpFunction, SignInFunction } from './Firebase';


const Auth = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSignUpFunction() {
        setLoading(true)
        try {
            await signUpFunction(emailRef.current.value, passwordRef.current.value)
            navigate('/home')
        }
        catch {
            alert("This Email already exists or password is less than 6 characters")
        }
        setLoading(false)

    }

    async function handleSignInFunction() {
        setLoading(true)
        try {
            await SignInFunction(emailRef.current.value, passwordRef.current.value)
            navigate('/home')
        }
        catch {
            alert("Unable to Log In")
        }
        setLoading(false)

    }

    return (
        <>
            <div className='authPage'>
                <div className='authHeading'>
                    <h3>Authentication Page</h3>
                </div>
                <div>
                <input className='emailInput' ref={emailRef} type="email" placeholder='Enter Email Id...' />
                </div>
                <div>
                <input className='passwordInput' ref={passwordRef} type="password" placeholder='Enter Password...' />
                </div>
                <button disabled={loading} onClick={handleSignUpFunction} className='signUpButton'>Sign Up</button>
                <button disabled={loading} onClick={handleSignInFunction} className='signInButton'>Sign In</button>
            </div>
        </>
    )
}

export default Auth