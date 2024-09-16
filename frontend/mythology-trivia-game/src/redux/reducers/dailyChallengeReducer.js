import {
    FETCH_DAILY_CHALLENGE_REQUEST,
    FETCH_DAILY_CHALLENGE_SUCCESS,
    FETCH_DAILY_CHALLENGE_FAILURE,
    SUBMIT_DAILY_CHALLENGE_SUCCESS,
    SUBMIT_DAILY_CHALLENGE_FAILURE,
} from '../../actions/actionTypes';

const initialState = {
    loading: false,
    dailyChallenge: null,
    error: null,
    answerSubmitted: false,  // track if the user has submitted an answer
};

const dailyChallengesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DAILY_CHALLENGE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DAILY_CHALLENGE_SUCCESS:
            return { ...state, loading: false, dailyChallenge: action.payload };
        case FETCH_DAILY_CHALLENGE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case SUBMIT_DAILY_CHALLENGE_SUCCESS:
            return { ...state, answerSubmitted: true, error: null };
        case SUBMIT_DAILY_CHALLENGE_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default dailyChallengesReducer;