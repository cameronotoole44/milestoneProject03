import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const Leaderboard = ({
    onGameboardNavigation,
    onProfileNavigation,
    onLogout
}) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const token = currentUser.access_token;
                const response = await fetch('http://localhost:5000/leaderboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setLeaderboard(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [currentUser]);

    if (loading) {
        return <p className="loading-message">Loading...</p>;
    }

    return (
        <div className="leaderboard-page">
            <div className="leaderboard-container">
                <h2 className="leaderboard-title">Leaderboard</h2>
                <ul className="leaderboard-list">
                    {leaderboard.map((user, index) => (
                        <li key={index} className="leaderboard-item">
                            <span className="user-rank-name">{index + 1}. {user.username}</span>
                            <span className="user-score">{user.total_score}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <nav className="button-bar">
                <button onClick={onGameboardNavigation} className="leaderboard">Gameboards</button>
                <button onClick={onProfileNavigation} className="leaderboard">Profile</button>
                <button onClick={onLogout} className="leaderboard-button">Logout</button>
            </nav>
        </div>
    );
};

export default Leaderboard;