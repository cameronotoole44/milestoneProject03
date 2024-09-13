import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../actions/userActions';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, loading, error } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    useEffect(() => {
        if (currentUser && currentUser.access_token) {
            console.log('User logged in, navigating to dashboard');
            navigate('/dashboard');
        }
    }, [currentUser, navigate]);

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-content">
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                    <button onClick={() => navigate('/')} className="home-button">
                        Home
                    </button>
                    <button
                        type="submit"
                        className="register-button"
                    >
                        Register
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    )
};

export default Login;