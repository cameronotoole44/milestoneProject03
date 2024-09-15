import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

function NorseGame() {
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
        dispatch(fetchQuestions('Norse'));
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
            dispatch(setTimeLeft(Math.max(timeLeft - 3, 0))); // subtract 3 seconds from every wrong answer
        }

        if (currentQuestionIndex + 1 < questions.length) {
            dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
        } else {
            handleEndGame();
        }
    };

    // activate powerups
    const activatePowerUp = (powerUp) => {
        dispatch(setActivePowerUp(powerUp.name));
        dispatch(setPowerUps(powerUps.filter(p => p.id !== powerUp.id)));
    };

    const renderQuestion = () => {
        const question = questions[currentQuestionIndex];
        return (
            <div className="question-container">
                <h2>{question.question_text}</h2>
                <div className="answer-options">
                    {['option_a', 'option_b', 'option_c', 'option_d'].map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(question[option] === question.correct_answer)}
                        >
                            {question[option]}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="game-container">
            <h1>Norse Mythology</h1>
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
            {gameState === 'ended' && (
                <div className="game-over">
                    <h2>Game Over!</h2>
                    <p>Final Score: {score}</p>
                    <div className="navigation-buttons">
                        <button onClick={() => handleNavigate('/gameboard')}>
                            Back to Gameboards
                        </button>
                        <button onClick={() => handleNavigate('/dashboard')}>
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NorseGame;