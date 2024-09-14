import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../actions/userActions";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [timeOfDay, setTimeOfDay] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    // login redirect
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();
            if (hour < 12) {
                setTimeOfDay("morning");
            } else if (hour < 18) {
                setTimeOfDay("afternoon");
            } else {
                setTimeOfDay("evening");
            }
        };

        updateGreeting();

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // update: every minute

        return () => clearInterval(timer);
    }, []);

    const formattedTime = format(currentTime, "hh:mm a");
    const formattedDate = format(currentTime, "do MMMM yyyy");
    // logout
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };
    //  redirects
    const handleProfile = () => {
        navigate('/profile');
    };
    const handleHomeNavigation = () => {
        navigate('/');
    };


    if (!currentUser) {
        return <p className="loading-text">Loading...</p>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h1 className="dashboard-title">
                    Good {timeOfDay}, {currentUser.username}!
                </h1>
                <p className="dashboard-subtitle">
                    It is currently {formattedTime} on {formattedDate}.
                </p>
                <div className="daily-challenge">
                    <h2 className="daily-challenge-title">Daily Challenge</h2>
                    <p className="daily-challenge-question">question</p>
                    <p className="daily-challenge-answers">answers</p>
                    <ul className="daily-challenge-list">
                        <li className="daily-challenge-item">A</li>
                        <li className="daily-challenge-item">B</li>
                        <li className="daily-challenge-item">C</li>
                        <li className="daily-challenge-item">D</li>
                    </ul>
                </div>

                <div>
                    <h2 className="quick-links-title">Quick Links</h2>
                    <div className="quick-links-container">
                        <button onClick={handleHomeNavigation} className="home-button">
                            Home
                        </button>
                        <button onClick={handleProfile} className="profile-button">
                            Profile
                        </button>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;