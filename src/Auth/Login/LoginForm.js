import React, { useState, useEffect } from 'react';
import { useLoginQuery } from '../../API/rtkQuery';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data, error, isLoading } = useLoginQuery({ email, password });
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage("");
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [successMessage]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (data) {
            const user = data[0];
            if(user.role === 'admin'){
                setSuccessMessage("Login success!");
                navigate('/admin-dashboard')
            }
            else if(user.role === 'user'){
                setSuccessMessage("Login success!");
                navigate('/user-dashboard', {state:{user}})
            }
        }
        if (error) {
            setSuccessMessage("Please register")
        }
    };

    return (
        <div className='container'>
            <h3 className='text-center mt-5 fw-bolder'>Admin Login</h3>
            {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
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