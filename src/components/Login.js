import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Auth = () => {
    const [password, setPassword] = useState('');
    const [usernameOrEmail, setUsernameOrEmail] = useState(''); // Change this line
    const [passwordError, setPasswordError] = useState('');
    const [usernameOrEmailError, setUsernameOrEmailError] = useState(false); // Change this line
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter(); // Initialize the router instance

    const submit = async (e) => {
        e.preventDefault();
        setUsernameOrEmailError(false); // Change this line
        setPasswordError('');
        setError('');

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

        const isEmail = emailRegex.test(usernameOrEmail);

        try {
            const { data } = await axios.post('login', {
                email: isEmail ? usernameOrEmail : undefined,
                username: isEmail ? undefined : usernameOrEmail,
                password,
                rememberMe
            });
            if (data) {
                // Redirect to the login page
                router.push('/dashboard');
            } else {
                // Sign-in failed, display an error message
                setError('An error occurred during sign-in');
            }


        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);

                // Set error flags based on the error message
                if (errorMessage.includes('Username or Email')) {
                    setUsernameOrEmailError(errorMessage);
                }
                if (errorMessage.includes('Password')) {
                    setPasswordError(errorMessage);
                }
            }
        }
    };

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError('');

        if (!value) {
            setPasswordError('Password is required');
        }
    };
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <article className='prose'>
                    <h1>Sign In</h1>
                    <div className="mt-1 font-normal">
                        Enter your details to sign-in.

                    </div>
                </article>

                {error && (
                    <div className="alert alert-error w-96">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <div className='mb-5'>
                            <input
                                type="text"
                                placeholder="Email or Username"
                                className={
                                    usernameOrEmailError
                                        ? ("input input-bordered input-error w-full max-w-full")
                                        : ("input input-bordered input-md w-full max-w-full")
                                }
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                            />

                            {usernameOrEmailError && <div className="text-red-500 text-xs mt-1">{usernameOrEmailError}</div>}
                        </div>
                        <div className='mb-5'>
                            <input
                                type="password"
                                placeholder="Password"
                                className={
                                    passwordError
                                        ? ("input input-bordered input-error w-full max-w-full")
                                        : ("input input-bordered w-full max-w-full")
                                }
                                onChange={(e) => validatePassword(e.target.value)}
                            />

                            {passwordError && <div className="text-red-500 text-xs mt-1">{passwordError}</div>}
                        </div>
                    </div>
                    <div className="form-control flex flex-row">
                        <label className="label cursor-pointer gap-4">
                            <input
                                type="checkbox"
                                className="checkbox"
                                onChange={(e) => setRememberMe(e.target.checked)} // Add this line to capture the checkbox state

                            />
                            <span className="label-text">Remember me</span>
                        </label>
                    </div>
                    <button className="btn btn-block btn-primary mt-4" type='submit'>Login</button>
                </form>

            </div>

        </>
    )
}

export default Auth