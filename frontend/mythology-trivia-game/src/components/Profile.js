import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PowerUps from '../components/powerups/PowerUpsProfile';
import { logoutUser } from "../actions/userActions";

const Profile = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({
        games_played: 0,
        total_score: 0,
        highest_score: 0,
        user_powerup: []
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

                    const response = await fetch("https://loremasterbe.up.railway.app/profile/", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) throw new Error("Failed to fetch profile data");

                    const profileData = await response.json();

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

    const handleNavigation = (path) => {
        navigate(path);
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

            <div className="powerups-section">
                <PowerUps powerups={profileData.powerups} />
            </div>

            <div className="button-bar">
                <button onClick={() => handleNavigation('/')} className="home-button">
                    Home
                </button>
                <button onClick={() => handleNavigation('/dashboard')} className="dashboard-button">
                    Dashboard
                </button>
                <button onClick={() => handleNavigation('/gameboard')} className="gameboard-button">
                    Gameboards
                </button>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    )
};

export default Profile;