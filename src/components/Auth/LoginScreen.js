import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { ui } = useSelector(state => state);
    const { loading } = ui;


    const [values, handleInputChange] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = values;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(startLoginEmailPassword(email, password))
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }


    return (
        <>
            <h1 className='auth__title mb-4'>Login</h1>

            <form
                onSubmit={handleLogin}
                className='animate__animated animate__fadeIn animate__fast'
            >
                <input
                    type='text'
                    placeholder='Enter your email'
                    name='email'
                    value={email}
                    className='auth__input'
                    onChange={handleInputChange}
                />

                <input
                    type='password'
                    placeholder='Enter your password'
                    name='password'
                    value={password}
                    className='auth__input'
                    onChange={handleInputChange}
                />


                <button className='btn btn-primary btn-block' disabled={loading} type='submit'>
                    Login
                </button>

            </form>
            <div className='auth__social-networks animate__animated animate__fadeIn animate__fast'>
                <h2>Login with social networks</h2>
                <div className='google-btn' onClick={handleGoogleLogin}>
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>
            </div>
            <Link className='link' to='/auth/register'>
                Create new account
            </Link>
        </>
    )
}
