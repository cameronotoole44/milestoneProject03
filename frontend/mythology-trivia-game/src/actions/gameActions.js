import {
    FETCH_DAILY_CHALLENGE_REQUEST,
    FETCH_DAILY_CHALLENGE_SUCCESS,
    FETCH_DAILY_CHALLENGE_FAILURE,
    SUBMIT_DAILY_CHALLENGE_REQUEST,
    SUBMIT_DAILY_CHALLENGE_SUCCESS,
    SUBMIT_DAILY_CHALLENGE_FAILURE,
    ACTIVATE_POWERUP_SUCCESS,
    ACTIVATE_POWERUP_FAILURE,
    UPDATE_PLAYER_STATS,
    UPDATE_SCORE,
    SET_QUESTIONS,
    SET_CURRENT_QUESTION_INDEX,
    SET_GAME_STATE,
    SET_COUNTDOWN,
    SET_TIME_LEFT,
    SET_POWER_UPS,
    SET_USER_POWERUPS,
    SET_ACTIVE_POWER_UP,
    SET_FEEDBACK,
    PAUSE,
    RESUME
} from './actionTypes';

export const fetchDailyChallenge = () => async (dispatch, getState) => {
    const token = getState().user.currentUser.access_token;

    dispatch({ type: FETCH_DAILY_CHALLENGE_REQUEST });

    try {
        const themeResponse = await fetch('https://loremaster.up.railway.app/random-theme/', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (themeResponse.ok) {
            const themeData = await themeResponse.json();
            const theme = themeData.theme;

            const challengeResponse = await fetch(`https://loremaster.up.railway.app/daily-challenge?theme=${theme}/`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (challengeResponse.ok) {
                const challengeData = await challengeResponse.json();
                console.log('Fetched challenge data:', challengeData);
                dispatch({
                    type: FETCH_DAILY_CHALLENGE_SUCCESS,
                    payload: challengeData
                });
            } else {
                throw new Error('Failed to fetch daily challenge');
            }
        } else {
            throw new Error('Failed to fetch random theme');
        }
    } catch (error) {
        console.error('Error fetching daily challenge:', error);
        dispatch({
            type: FETCH_DAILY_CHALLENGE_FAILURE,
            error: error.message
        });
    }
};

// submit answer
export const submitAnswer = (questionId, selectedAnswer) => async (dispatch, getState) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser?.access_token;

    if (!currentUser) return;

    dispatch({ type: SUBMIT_DAILY_CHALLENGE_REQUEST });

    try {
        const response = await fetch('https://loremaster.up.railway.app/submit-daily-challenge/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                question_id: questionId,
                answer: selectedAnswer
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        dispatch({
            type: SUBMIT_DAILY_CHALLENGE_SUCCESS,
            payload: {
                feedback: data.correct ? "Correct! Great job!" : "Sorry, that's incorrect. Try again!",
                isCorrect: data.correct,
                completed: true
            }
        });
    } catch (error) {
        console.error('Error submitting answer:', error);
        dispatch({
            type: SUBMIT_DAILY_CHALLENGE_FAILURE,
            error: error.message || 'Error submitting answer'
        });
    }
};

// questions
export const fetchQuestions = (theme) => async (dispatch) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser?.access_token;

    if (!token) {
        console.error('No token found.');
        return;
    }

    try {
        const response = await fetch(`https://loremaster.up.railway.app/questions?theme=${theme}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error('Failed to fetch questions');

        dispatch({ type: SET_QUESTIONS, payload: data });
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
};

// player stats
export const updatePlayerStats = (score) => async (dispatch) => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = currentUser?.access_token;
        // console.log('Sending score to server:', score); 
        const response = await fetch('https://loremaster.up.railway.app/auth/update_stats/', {
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
                type: UPDATE_PLAYER_STATS,
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
    dispatch({ type: UPDATE_SCORE, payload: newScore });
};


//  power ips
export const fetchUserPowerUps = () => async (dispatch, getState) => {
    const token = getState().user.currentUser.access_token;

    try {
        const response = await fetch('https://loremaster.up.railway.app/profile/powerups/', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch user power-ups');

        const data = await response.json();
        dispatch({
            type: SET_USER_POWERUPS,
            payload: data.powerups,
        });
    } catch (error) {
        console.error('Error fetching user power-ups:', error);
    }
};


// activate powerup success
export const activatePowerUpSuccess = (message, powerupName) => ({
    type: ACTIVATE_POWERUP_SUCCESS,
    payload: { message, powerupName }
});

// activate powerup fail
export const activatePowerUpFailure = (error) => ({
    type: ACTIVATE_POWERUP_FAILURE,
    payload: error
});


// action handlers
export const setCurrentQuestionIndex = (index) => (dispatch) => {
    dispatch({ type: SET_CURRENT_QUESTION_INDEX, payload: index });
};

export const setGameState = (state) => (dispatch) => {
    dispatch({ type: SET_GAME_STATE, payload: state });
};
export const pause = () => {
    return { type: PAUSE }
};

export const resume = () => {
    return { type: RESUME }
};

export const setCountdown = (countdown) => (dispatch) => {
    dispatch({ type: SET_COUNTDOWN, payload: countdown });
};

export const setTimeLeft = (time) => (dispatch) => {
    dispatch({ type: SET_TIME_LEFT, payload: time });
};

export const setPowerUps = (powerUps) => (dispatch) => {
    dispatch({ type: SET_POWER_UPS, payload: powerUps });
};

export const setUserPowerUps = (powerUps) => (dispatch) => {
    dispatch({ type: SET_USER_POWERUPS, payload: powerUps });
};

export const setActivePowerUp = (powerUp) => (dispatch) => {
    dispatch({ type: SET_ACTIVE_POWER_UP, payload: powerUp });
};

export const setFeedback = (feedback) => (dispatch) => {
    dispatch({ type: SET_FEEDBACK, payload: feedback });
};