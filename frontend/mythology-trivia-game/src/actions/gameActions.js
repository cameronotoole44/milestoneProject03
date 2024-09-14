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
        dispatch({ type: 'SET_QUESTIONS', payload: data });
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
};


export const setCurrentQuestionIndex = (index) => (dispatch) => {
    dispatch({ type: 'SET_CURRENT_QUESTION_INDEX', payload: index });
};

export const updateScore = (points) => (dispatch) => {
    dispatch({ type: 'UPDATE_SCORE', payload: points });
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