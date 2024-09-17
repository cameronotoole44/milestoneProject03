import {
    FETCH_DAILY_CHALLENGE_REQUEST,
    FETCH_DAILY_CHALLENGE_SUCCESS,
    FETCH_DAILY_CHALLENGE_FAILURE,
    SUBMIT_DAILY_CHALLENGE_SUCCESS,
    SUBMIT_DAILY_CHALLENGE_FAILURE,
} from './actionTypes';

export const fetchDailyChallenge = () => async (dispatch) => {
    dispatch({ type: FETCH_DAILY_CHALLENGE_REQUEST });

    try {
        const response = await fetch('http://localhost:5000/daily-challenge');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch daily challenge');
        }

        dispatch({
            type: FETCH_DAILY_CHALLENGE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_DAILY_CHALLENGE_FAILURE,
            payload: error.message,
        });
    }
};


export const submitDailyChallengeAnswer = (questionId, answer) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:5000/daily-challenge/${questionId}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to submit answer');
        }

        dispatch({
            type: SUBMIT_DAILY_CHALLENGE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: SUBMIT_DAILY_CHALLENGE_FAILURE,
            payload: error.message,
        });
    }
};

export const fetchQuestions = (theme) => async (dispatch) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser?.access_token;

    if (!token) {
        console.error('No token found.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/questions?theme=${theme}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error('Failed to fetch questions');

        dispatch({ type: 'SET_QUESTIONS', payload: data });
    } catch (error) {
        console.error('Error fetching questions:', error);
        // Handle error action here if necessary
    }
};

// player stats
export const updatePlayerStats = (score) => async (dispatch) => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = currentUser?.access_token;
        // console.log('Sending score to server:', score); 

        const response = await fetch('http://localhost:5000/auth/update_stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ score })
        });

        const data = await response.json();
        // console.log('Received data:', data);
        if (response.ok) {
            dispatch({
                type: 'UPDATE_PLAYER_STATS',
                payload: data
            });
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error updating player stats:', error);
    }
};

// update score
export const updateScore = (pointsEarned) => (dispatch, getState) => {
    const currentScore = getState().game.score;
    const newScore = currentScore + pointsEarned;

    // console.log(`Current Score: ${currentScore}, Adding: ${pointsEarned}, New Score: ${newScore}`);

    dispatch({ type: 'UPDATE_SCORE', payload: newScore });
};

// action handlers
export const setCurrentQuestionIndex = (index) => (dispatch) => {
    dispatch({ type: 'SET_CURRENT_QUESTION_INDEX', payload: index });
};

export const setGameState = (state) => (dispatch) => {
    dispatch({ type: 'SET_GAME_STATE', payload: state });
};

export const setCountdown = (countdown) => (dispatch) => {
    dispatch({ type: 'SET_COUNTDOWN', payload: countdown });
};

export const setTimeLeft = (time) => (dispatch) => {
    dispatch({ type: 'SET_TIME_LEFT', payload: time });
};

export const setPowerUps = (powerUps) => (dispatch) => {
    dispatch({ type: 'SET_POWER_UPS', payload: powerUps });
};

export const setActivePowerUp = (powerUp) => (dispatch) => {
    dispatch({ type: 'SET_ACTIVE_POWER_UP', payload: powerUp });
};