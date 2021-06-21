import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmail } from '../../actions/auth';
// import { startLoginEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);


    const [values, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = values;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmail(name, password, email));
        }
    }

    const isFormValid = () => {

        if (name.length === 0) {
            dispatch(setError('name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('email is no valid'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('password should be at 6 characters and match each other'));
            return false
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h1 className='auth__title mb-4'>Register</h1>

            <form
                onSubmit={handleRegister}
                className='animate__animated animate__fadeIn animate__fast'
            >
                {
                    msgError
                    &&
                    <div className='auth__alert-error'>{msgError}</div>
                }
                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={name}
                    className='auth__input mb-3'
                    onChange={handleInputChange}
                />

                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={email}
                    className='auth__input mb-3'
                    onChange={handleInputChange}
                />

                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    className='auth__input mb-3'
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    placeholder='Confirm password'
                    name='password2'
                    value={password2}
                    className='auth__input mb-3'
                    onChange={handleInputChange}
                />

                <button className='btn btn-primary btn-block' type='submit'>
                    Register
                </button>

            </form>

            <Link className='link mt-2' to='/auth/login'>
                Already register ?
            </Link>
        </>
    )
}
