import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <div className="content-card">
                <h1 className="title">LoreMaster Showdown</h1>
                <div className="description">
                    <p>Mythology Trivia Game</p>
                </div>
                <div className="features">
                    <p>🏛️ </p>
                    <p>🏆 </p>
                    <p>🌟 </p>
                </div>
                <div className="button-container">
                    <button onClick={() => navigate('/register')} className="register-button">
                        Register
                    </button>
                    <button onClick={() => navigate('#')} className="start-button">
                        Start
                    </button>
                    <button onClick={() => navigate('/login')} className="login-button">
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Home;