import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";

const Profile = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({
        games_played: 0,
        total_score: 0,
        highest_score: 0,
        powerups: []
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            const fetchProfileData = async () => {
                try {
                    const token = currentUser.access_token;

                    if (!token) {
                        console.error("No token found");
                        return;
                    }

                    const response = await fetch("http://localhost:5000/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) throw new Error("Failed to fetch profile data");

                    const profileData = await response.json();

                    // for debugging
                    // console.log("Profile Data:", profileData);

                    // use data from backend!
                    setProfileData({
                        games_played: profileData.games_played,
                        total_score: profileData.total_score,
                        highest_score: profileData.highest_score,
                        powerups: profileData.powerups || [],
                    });
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                } finally {
                    setLoading(false);
                }
            };


            fetchProfileData();
        }
    }, [currentUser]);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    const handleDashboard = () => {
        navigate('/dashboard');
    };

    const handleHomeNavigation = () => {
        navigate('/');
    };

    if (loading) return <div className="loading-text">Loading profile data...</div>;

    return (
        <div className="profile-container">
            <h1>{currentUser.username}'s Profile</h1>
            <div className="profile-stats">
                <div>
                    <p>Games Played</p>
                    <p>{profileData.games_played}</p>
                </div>
                <div>
                    <p>Total Score</p>
                    <p>{profileData.total_score}</p>
                </div>
                <div>
                    <p>Highest Score</p>
                    <p>{profileData.highest_score}</p>
                </div>
            </div>

            <h2>Power-ups</h2>
            <ul>
                {profileData.powerups.length ? profileData.powerups.map((powerup, index) => (
                    <li key={index}>
                        <span>{powerup.name}:</span> {powerup.description}
                    </li>
                )) : <p>No power-ups</p>}
            </ul>

            <button onClick={handleHomeNavigation} className="home-button">
                Home
            </button>
            <button onClick={handleDashboard} className="dashboard-button">
                Dashboard
            </button>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    )
};

export default Profile;

