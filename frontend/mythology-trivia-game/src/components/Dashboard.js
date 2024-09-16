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
    const [dailyChallenge, setDailyChallenge] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    const token = currentUser?.access_token;

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
        }, 60000); // update every minute

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchDailyChallenge = async () => {
            try {
                const themeResponse = await fetch('http://localhost:5000/random-theme', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (themeResponse.ok) {
                    const themeData = await themeResponse.json();
                    const theme = themeData.theme;

                    const challengeResponse = await fetch(`http://localhost:5000/daily-challenge?theme=${theme}`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${token}` },
                    });

                    if (challengeResponse.ok) {
                        const data = await challengeResponse.json();
                        setDailyChallenge(data); // updates state
                    }
                }
            } catch (error) {
                console.error('Error fetching daily challenge:', error);
            }
        };

        if (token) {
            fetchDailyChallenge();
        }
    }, [token]);

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

    const handleLeaderboardNavigation = () => {
        navigate('/leaderboard');
    };

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === dailyChallenge.correct_answer) {
            setFeedback("Correct! Great job!");
        } else {
            setFeedback("Sorry, that's incorrect. Try again!");
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
                    {dailyChallenge ? (
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
                            {feedback && <p className="feedback-text">{feedback}</p>}
                        </>
                    ) : (
                        <p>Loading challenge...</p>
                    )}
                </div>

                <div>
                    <h2 className="quick-links-title">Quick Links</h2>
                    <div className="quick-links-container">
                        <button onClick={handleHomeNavigation} className="dashboard-button">
                            Home
                        </button>
                        <button onClick={handleLeaderboardNavigation} className="dashboard-button">
                            Leaderboard
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
        </div>
    );
};

export default Dashboard;