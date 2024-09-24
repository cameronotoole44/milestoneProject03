import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../actions/userActions';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://loremaster.up.railway.app/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);

            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                dispatch(setCurrentUser({
                    id: data.user.id,
                    username: data.user.username,
                    access_token: data.access_token
                }));
                setMessage('Registration successful! Redirecting to dashboard...');
                setTimeout(() => navigate('/dashboard'), 1500);
            } else {
                setMessage('Registration successful, but login failed. Please try logging in manually.');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Create Username</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="register-button"
                >
                    Register
                </button>
            </form>
            {message && (
                <div className="register-message">
                    {message}
                </div>
            )}
        </div>
    )
};

export default Register;