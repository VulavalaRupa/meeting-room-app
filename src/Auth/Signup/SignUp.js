import React, { useState, useEffect } from 'react';
import { useSignupMutation } from '../../API/rtkQuery';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [signup, error, isLoading] = useSignupMutation();
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage("");
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [successMessage]);

    const handleSignup = (e) => {
        e.preventDefault();
        const newUser = {
            username,
            email,
            password,
            role,
            status
        }
        if (!username || !email || !password || !role || !status) {
            setErrorMessage('Please fill all the fields to register');
            return;
          }
        signup(newUser).unwrap().then((result) => {
            console.log("SIgnUp", result)
            if (result) {
                setSuccessMessage("User registered successfully!");
                navigate("/");
            }
            else {
                setErrorMessage('Error occurred while registering');
            }
        })
    }

    return (
        <div className='container'>
            <h3 className='text-center mt-5 fw-bolder'>Sign up</h3>
            {successMessage && <div className="mt-3 alert alert-success w-75">{successMessage}</div>}
            {errorMessage && <div className="mt-3 alert alert-danger mx-auto w-75">{errorMessage}</div>}
            <div className='card shadow mx-auto w-75 p-5'>
                <form >
                    <div class="row">
                        <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg fw-bold">Username</label>
                        <div className="col-sm-10 mb-4">
                            <div className="input-group">
                                <div className="input-group-text"><i className='fa fa-user'></i></div>
                                <input type="text" className="form-control form-control-lg" placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>
                        <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg fw-bold">Email</label>
                        <div className="col-sm-10 mb-4">
                            <div className="input-group">
                                <div className="input-group-text"><i className='fa fa-envelope'></i></div>
                                <input type="email" className="form-control form-control-lg" placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg fw-bold">Password</label>
                        <div className="col-sm-10 mb-4">
                            <div className="input-group">
                                <div className="input-group-text"><i className='fa fa-lock'></i></div>
                                <input className="form-control form-control-lg" placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg fw-bold">Role</label>
                        <div className="col-sm-10 mb-4">
                            <div className="input-group">
                                <div className="input-group-text"><i className='fa fa-user'></i></div>
                                <input className="form-control form-control-lg" placeholder="Role"
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)} />
                            </div>
                        </div>
                        <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg fw-bold">Status</label>
                        <div className="col-sm-10 mb-4">
                            <div className="input-group">
                                <input className="form-control form-control-lg" placeholder="Status"
                                    type="text"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='d-grid gap-2 d-md-flex justify-content-center w-50'>
                        <button type="button" className="btn btn-primary" disabled={isLoading} onClick={handleSignup}>
                            {isLoading ? 'Signing in...' : 'Sign Up'}
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )

}

export default SignUp;