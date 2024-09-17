import {
    FETCH_DAILY_CHALLENGE_REQUEST,
    FETCH_DAILY_CHALLENGE_SUCCESS,
    FETCH_DAILY_CHALLENGE_FAILURE,
    SUBMIT_DAILY_CHALLENGE_REQUEST,
    SUBMIT_DAILY_CHALLENGE_SUCCESS,
    SUBMIT_DAILY_CHALLENGE_FAILURE,
    UPDATE_PLAYER_STATS,
    UPDATE_SCORE,
    SET_QUESTIONS,
    SET_CURRENT_QUESTION_INDEX,
    SET_GAME_STATE,
    SET_COUNTDOWN,
    SET_TIME_LEFT,
    SET_POWER_UPS,
    SET_ACTIVE_POWER_UP,
    SET_FEEDBACK
} from './actionTypes';

export const fetchDailyChallenge = () => async (dispatch, getState) => {
    const token = getState().user.currentUser.access_token;

    dispatch({ type: FETCH_DAILY_CHALLENGE_REQUEST });

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


export const submitAnswer = (selectedAnswer) => async (dispatch, getState) => {
    const { dailyChallenge } = getState().dailyChallenge;

    if (!dailyChallenge) return;

    dispatch({ type: SUBMIT_DAILY_CHALLENGE_REQUEST });

    try {

        // need to come back and send to backend, client-side ez for now, i'll come back and send answer to backend
        const isCorrect = selectedAnswer === dailyChallenge.correct_answer;
        await new Promise(resolve => setTimeout(resolve, 500));

        dispatch({
            type: SUBMIT_DAILY_CHALLENGE_SUCCESS,
            payload: {
                feedback: isCorrect ? "Correct! Great job!" : "Sorry, that's incorrect. Try again!",
                selectedAnswer
            }
        });
    } catch (error) {
        console.error('Error submitting answer:', error);
        dispatch({
            type: SUBMIT_DAILY_CHALLENGE_FAILURE,
            error: 'Error submitting answer'
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

// action handlers
export const setCurrentQuestionIndex = (index) => (dispatch) => {
    dispatch({ type: SET_CURRENT_QUESTION_INDEX, payload: index });
};

export const setGameState = (state) => (dispatch) => {
    dispatch({ type: SET_GAME_STATE, payload: state });
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

export const setActivePowerUp = (powerUp) => (dispatch) => {
    dispatch({ type: SET_ACTIVE_POWER_UP, payload: powerUp });
};

export const setFeedback = (feedback) => (dispatch) => {
    dispatch({ type: SET_FEEDBACK, payload: feedback });
};