import {
    SET_QUESTIONS,
    SET_CURRENT_QUESTION_INDEX,
    UPDATE_SCORE,
    SET_TIME_LEFT,
    SET_GAME_STATE,
    SET_COUNTDOWN,
    SET_POWER_UPS,
    SET_ACTIVE_POWER_UP,
    END_GAME,
    UPDATE_PLAYER_STATS,
    SET_USER_POWERUPS
} from '../../actions/actionTypes';

const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timeLeft: 60,
    gameState: 'countdown',
    countdown: 5,
    powerUps: [],
    activePowerUp: null,
    userPowerups: []
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUESTIONS:
            return { ...state, questions: action.payload };
        case SET_CURRENT_QUESTION_INDEX:
            return { ...state, currentQuestionIndex: action.payload };
        case UPDATE_SCORE:
            return { ...state, score: action.payload };
        case SET_TIME_LEFT:
            return { ...state, timeLeft: action.payload };
        case SET_GAME_STATE:
            return { ...state, gameState: action.payload };
        case SET_COUNTDOWN:
            return { ...state, countdown: action.payload };
        case SET_POWER_UPS:
            return { ...state, powerUps: action.payload };
        case SET_ACTIVE_POWER_UP:
            return { ...state, activePowerUp: action.payload };
        case SET_USER_POWERUPS:
            return { ...state, userPowerups: action.payload };
        case END_GAME:
            return { ...state, endGame: action.payload };
        case UPDATE_PLAYER_STATS:
            return { ...state, playerStats: action.payload };
        default:
            return state;
    }
};

export default gameReducer;