import React, { useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../actions/userActions";

import {
    fetchQuestions,
    setCurrentQuestionIndex,
    updateScore,
    setTimeLeft,
    setGameState,
    setCountdown,
    setActivePowerUp,
    setPowerUps,
    updatePlayerStats
} from '../../actions/gameActions';

function EgyptianGame() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        questions,
        currentQuestionIndex,
        score,
        timeLeft,
        gameState,
        countdown,
        powerUps,
        activePowerUp,
    } = useSelector(state => state.game);


    useEffect(() => {
        dispatch(fetchQuestions('Egyptian'));
    }, [dispatch]);


    const handleEndGame = useCallback(() => {
        dispatch(setGameState('ended'));
        dispatch(updatePlayerStats(score));
    }, [dispatch, score]);

    // countdown and timer
    useEffect(() => {
        let timer;
        if (gameState === 'countdown' && countdown > 0) {
            timer = setInterval(() => dispatch(setCountdown(countdown - 1)), 1000);
        } else if (gameState === 'countdown' && countdown === 0) {
            dispatch(setGameState('playing'));
        } else if (gameState === 'playing' && timeLeft > 0) {
            timer = setInterval(() => dispatch(setTimeLeft(timeLeft - 1)), 1000);
        } else if (gameState === 'playing' && timeLeft === 0) {
            handleEndGame();
        }
        return () => clearInterval(timer);
    }, [gameState, countdown, timeLeft, dispatch, handleEndGame]);

    // user answer
    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            let pointsEarned = 10;
            if (activePowerUp === 'double_points') {
                pointsEarned *= 2;
                dispatch(setActivePowerUp(null));
            }
            dispatch(updateScore(pointsEarned));
            dispatch(setTimeLeft(Math.min(timeLeft + 5, 60))); // add 5 seconds on correct answers
        } else if (activePowerUp === 'shield') {
            dispatch(setActivePowerUp(null));
        } else {
            dispatch(setTimeLeft(Math.max(timeLeft - 3, 0))); // subtract 3 seconds on wrong answers
        }

        if (currentQuestionIndex + 1 < questions.length) {
            dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
        } else {
            handleEndGame(); // in the case there are no more questions
        }
    };

    const handleGameboard = () => {
        navigate('/gameboard');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };


    // POWER UP SECTION** //
    const activatePowerUp = (powerUp) => {
        dispatch(setActivePowerUp(powerUp.name));
        dispatch(setPowerUps(powerUps.filter(p => p.id !== powerUp.id)));
    };


    const renderQuestion = () => {
        if (questions.length === 0) {
            return <p>No more questions available. Please check back soon!</p>;
        }

        const question = questions[currentQuestionIndex];
        // check to make sure options is available before mapping over
        if (!question || !question.options) {
            return <p>Loading...</p>;
        }
        return (
            <div className="question-container">
                <h2>{question.question_text}</h2>
                <div className="answer-options">
                    {question.options.map((optionObj, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(optionObj.text === question.correct_answer)}
                        >
                            {optionObj.text}
                        </button>
                    ))}
                </div>
            </div>
        )
    };

    const renderEndGameMessage = () => {
        return (
            <div className="game-over">
                <h2>Game Over!</h2>
                <p>Final Score: {score}</p>
                <p>You've answered all available questions. More questions coming soon!</p>
                <div className="navigation-buttons">
                    <button onClick={handleGameboard} className="gameboard-button">
                        Gameboards
                    </button>
                    <button onClick={handleProfile} className="profile-button">
                        Profile
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="game-container">
            <h1>Egyptian Mythology</h1>
            {gameState === 'countdown' && <div className="countdown">{countdown}</div>}
            {gameState === 'playing' && (
                <>
                    <div className="game-stats">
                        <span>Score: {score}</span>
                        <span>Time left: {timeLeft}s</span>
                    </div>
                    {questions.length > 0 ? renderQuestion() : <p>Loading questions...</p>}
                    <div className="power-ups">
                        {powerUps.map(powerUp => (
                            <button key={powerUp.id} onClick={() => activatePowerUp(powerUp)}>
                                {powerUp.name}
                            </button>
                        ))}
                    </div>
                </>
            )}
            {gameState === 'ended' && renderEndGameMessage()}
        </div>
    )
};

export default EgyptianGame;