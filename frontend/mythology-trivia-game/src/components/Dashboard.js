import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDailyChallenge, submitAnswer } from '../actions/gameActions';
import { logoutUser } from "../actions/userActions";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const dailyChallenge = useSelector((state) => state.dailyChallenge.dailyChallenge);
    const feedback = useSelector((state) => state.dailyChallenge.feedback);
    const isCorrect = useSelector((state) => state.dailyChallenge.isCorrect);
    const challengeCompleted = useSelector((state) => state.dailyChallenge.completed);
    const loading = useSelector((state) => state.dailyChallenge.loading);
    const [timeOfDay, setTimeOfDay] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const token = currentUser?.access_token;


    useEffect(() => {
        const handleLogoutCleanup = () => {
            localStorage.removeItem('dailyChallengeData'); // clears local storage on logout
        };

        if (!currentUser) {
            handleLogoutCleanup();
        }
    }, [currentUser]);

    useEffect(() => {
        if (token && currentUser) {
            console.log("Fetching fresh daily challenge for user:", currentUser.username);
            dispatch(fetchDailyChallenge());
        }
    }, [dispatch, token, currentUser]);

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
        }, 60000); // update every minute

        return () => clearInterval(timer);
    }, []);

    const formattedTime = format(currentTime, "hh:mm a");
    const formattedDate = format(currentTime, "do MMMM yyyy");

    // logout
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    // redirects
    const handleProfile = () => {
        navigate('/profile');
    };

    const handleHomeNavigation = () => {
        navigate('/');
    };

    const handleGameboardNavigation = () => {
        navigate('/gameboard');
    };

    const handleLeaderboardNavigation = () => {
        navigate('/leaderboard');
    };

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    // daily challenge answer submission
    const handleSubmitAnswer = () => {
        if (dailyChallenge && dailyChallenge.id) {
            dispatch(submitAnswer(dailyChallenge.id, selectedAnswer));
        }
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
                    {loading ? (
                        <p>Loading challenge...</p>
                    ) : challengeCompleted ? (
                        <p>You have completed the daily challenge. Come back tomorrow for a new one!</p>
                    ) : dailyChallenge && dailyChallenge.question_text ? (
                        <>
                            <p className="daily-challenge-question">{dailyChallenge.question_text}</p>
                            <form>
                                {dailyChallenge.options.map((option, index) => (
                                    <div key={index} className="daily-challenge-answer">
                                        <input
                                            type="radio"
                                            id={`option${index}`}
                                            name="answer"
                                            value={option.text}
                                            onChange={handleAnswerChange}
                                            checked={selectedAnswer === option.text}
                                        />
                                        <label htmlFor={`option${index}`}>{option.text}</label>
                                    </div>
                                ))}
                                <button type="button" onClick={handleSubmitAnswer} className="dashboard-button mt-4">
                                    Submit Answer
                                </button>
                            </form>
                        </>
                    ) : (
                        <p>No challenge available at the moment.</p>
                    )}
                    {feedback && (
                        <p className={`feedback-text ${isCorrect ? 'correct' : 'incorrect'}`}>
                            {feedback}
                        </p>
                    )}
                </div>

                <div className="button-bar">
                    <button onClick={handleHomeNavigation} className="dashboard-button">
                        Home
                    </button>
                    <button onClick={handleLeaderboardNavigation} className="dashboard-button">
                        Leaderboard
                    </button>
                    <button onClick={handleGameboardNavigation} className="dashboard-button">
                        Gameboards
                    </button>
                    <button onClick={handleProfile} className="dashboard-button">
                        Profile
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;