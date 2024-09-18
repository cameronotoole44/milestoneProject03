import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../redux/currentUser';

const Home = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useCurrentUser();

    return (
        <div className="home-page">
            <div className="home-container">
                <h1 className="title">LoreMaster</h1>
                <h2 className="subtitle">The Mythology Trivia Game</h2>

                <div className="description">
                    <p>Take a journey through ancient myths and legends</p>
                </div>

                <div className="features">
                    <div className="feature">
                        <span className="feature-icon">🏛️</span>
                        <p>Explore Mythologies</p>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">🏆</span>
                        <p>Compete for The Top Spot</p>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">📚</span>
                        <p>Learn Ancient Stories</p>
                    </div>
                </div>

                <div className="button-bar">
                    {currentUser ? (
                        <>
                            <button onClick={() => navigate('/dashboard')} className="dashboard-button">
                                Dashboard
                            </button>
                            <button onClick={logout} className="logout-button">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate('/register')} className="register-button">
                                Register
                            </button>
                            <button onClick={() => navigate('/login')} className="login-button">
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Home;