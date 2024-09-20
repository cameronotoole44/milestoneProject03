import React, { useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../actions/userActions";
import store from '../../redux/store'

import {
    fetchQuestions,
    setCurrentQuestionIndex,
    updateScore,
    setTimeLeft,
    setGameState,
    setCountdown,
    // setActivePowerUp,
    // setPowerUps,
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
        // powerUps,
        // activePowerUp,
    } = useSelector(state => state.game);

    useEffect(() => {
        dispatch(fetchQuestions('Egyptian'));
    }, [dispatch]);

    const handleEndGame = useCallback(() => {
        dispatch(setGameState('ended'));
        const finalScore = store.getState().game.score;
        dispatch(updatePlayerStats(finalScore));
    }, [dispatch]);

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

    const handleAnswer = (isCorrect) => {
        let pointsEarned = 0;

        if (isCorrect) {
            pointsEarned = 10;
            // if (activePowerUp === 'ThorsFury') {
            //     pointsEarned *= 2;
            //     dispatch(setActivePowerUp(null));
            // }
            console.log(`Points earned this round: ${pointsEarned}`);
            dispatch(setTimeLeft(Math.min(timeLeft + 5, 60))); // add 5 seconds for correct answers
        } else {
            // if (activePowerUp === 'AthenasInsight') {
            //     dispatch(setActivePowerUp(null));
            // } else {
            dispatch(setTimeLeft(Math.max(timeLeft - 3, 0))); // subtract 3 seconds for wrong answers
        }

        dispatch(updateScore(pointsEarned));

        if (currentQuestionIndex + 1 >= questions.length) {
            setTimeout(() => {
                const finalScore = store.getState().game.score;
                dispatch(setGameState('ended'));
                dispatch(updatePlayerStats(finalScore));
            }, 0);
        } else {
            dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
        }
    };

    const currentScore = useSelector((state) => state.game.score);

    useEffect(() => {
        console.log(`Updated current score: ${currentScore}`);
    }, [currentScore]);

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

    // // POWER UP SECTION** //
    // const activatePowerUp = (powerUp) => {
    //     dispatch(setActivePowerUp(powerUp.name));
    //     dispatch(setPowerUps(powerUps.filter(p => p.id !== powerUp.id)));
    // };

    const renderQuestion = () => {
        if (questions.length === 0) {
            return <p>No more questions available. Please check back soon!</p>;
        }

        const question = questions[currentQuestionIndex];
        if (!question || !question.options) {
            return <p>Loading...</p>;
        }
        return (
            <div className="egyptian-question-container">
                <h2>{question.question_text}</h2>
                <div className="egyptian-answer-options">
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
        );
    };

    const renderEndGameMessage = () => {
        return (
            <div className="egyptian-game-over">
                <h2>Game Over!</h2>
                <p>Final Score: {score}</p>
                <p>More questions coming soon!</p>
                <div className="button-bar">
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
        <div className="egyptian-game-container">
            <h1>Egyptian Mythology</h1>
            {gameState === 'countdown' && <div className="egyptian-countdown">{countdown}</div>}
            {gameState === 'playing' && (
                <>
                    <div className="egyptian-game-stats">
                        <span>Score: {score}</span>
                        <span>Time left: {timeLeft}s</span>
                    </div>
                    {questions.length > 0 ? renderQuestion() : <p>Loading questions...</p>}
                    {/* <div className="egyptian-power-ups">
                        {powerUps.map(powerUp => (
                            <button key={powerUp.id} onClick={() => activatePowerUp(powerUp)}>
                                {powerUp.name}
                            </button>
                        ))}
                    </div> */}
                </>
            )}
            {gameState === 'ended' && renderEndGameMessage()}
        </div>
    );
}

export default EgyptianGame;