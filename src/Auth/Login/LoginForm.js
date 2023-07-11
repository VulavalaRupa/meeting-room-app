import React, { useState, useEffect } from 'react';
import { useLazyLoginQuery, useLoginQuery } from '../../API/rtkQuery';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { data, error, isLoading }] = useLazyLoginQuery();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            setErrorMessage('Please enter email and password');
            return;
        }
        login({ email, password });
    };

    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage("");
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [successMessage]);

    useEffect(() => {
        if (data) {
            const user = data[0];
            if (user?.role === 'admin') {
                setSuccessMessage('Login success!');
                navigate('/admin-dashboard');
            } else if (user?.role === 'user') {
                setSuccessMessage('Login success!');
                localStorage.setItem('UserName', user.username);
                navigate('/user-dashboard');
            } else {
                setErrorMessage('Invalid email or password!! Please register');
            }
        }
        if (error) {
            setErrorMessage('Error occurred while logging in');
            console.error(error);
        }
    }, [data, error, navigate]);

    return (
        <div className='container'>
            <h3 className='text-center mt-5 fw-bolder'>Admin Login</h3>
            {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
            <div className='card shadow mx-auto w-75 p-5'>
                <form >
                    <div class="row">
                        <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg fw-bold">Email</label>
                        <div className="col-sm-10 mb-4">
                            <div className="input-group">
                                <div className="input-group-text">@</div>
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
                    </div>
                    <div className='d-grid gap-2 d-md-flex justify-content-center'>
                        <button type="button" className="btn btn-primary" disabled={isLoading} onClick={handleLogin}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        <p>Dont have an Account? <Link to="/signup">Sign Up</Link></p>
                    </div>

                </form>
            </div>

        </div>
    )

}

export default LoginForm