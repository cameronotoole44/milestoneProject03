import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <div className="home-container">
                <h1 className="title">LoreMaster Showdown</h1>
                <div className="description">
                    <p>Mythology Trivia Game</p>
                </div>
                <div className="features">
                    <p>Explore different Mythologies🏛️</p>
                    <p>Compete for the Top Spot🏆</p>
                    <p>Earn Achievements🌟</p>
                </div>
                <div className="button-container">
                    <button onClick={() => navigate('/register')} className="register-button">
                        Register
                    </button>
                    <button onClick={() => navigate('/gameboard')} className="start-button">
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