import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../actions/userActions";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            if (!currentUser || !currentUser.access_token) return;

            try {
                const token = currentUser.access_token;
                const response = await fetch('https://loremaster.up.railway.app/leaderboard/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch leaderboard');
                }

                const data = await response.json();
                setLeaderboard(data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [currentUser]);

    const handleGameboardNavigation = () => {
        navigate('/gameboard');
    };

    const handleProfileNavigation = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    if (loading) {
        return <p className="loading-message">Loading...</p>;
    }

    return (
        <div className="leaderboard-page">
            <div className="leaderboard-container">
                <h2 className="leaderboard-title">Leaderboard</h2>
                <ul className="leaderboard-list">
                    {leaderboard.length > 0 ? (
                        leaderboard.map((user, index) => (
                            <li key={index} className="leaderboard-item">
                                <span className="user-rank-name">{index + 1}. {user.username}</span>
                                <span className="user-score">{user.total_score}</span>
                            </li>
                        ))
                    ) : (
                        <li className="no-data-message">No leaderboard data available</li>
                    )}
                </ul>
            </div>

            <nav className="button-bar">
                <button onClick={handleGameboardNavigation} className="leaderboard-button">Gameboards</button>
                <button onClick={handleProfileNavigation} className="leaderboard-button">Profile</button>
                <button onClick={handleLogout} className="leaderboard-button">Logout</button>
            </nav>
        </div>
    );
};

export default Leaderboard;
