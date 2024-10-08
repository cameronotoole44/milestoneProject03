import {
    FETCH_DAILY_CHALLENGE_REQUEST,
    FETCH_DAILY_CHALLENGE_SUCCESS,
    FETCH_DAILY_CHALLENGE_FAILURE,
    SUBMIT_DAILY_CHALLENGE_REQUEST,
    SUBMIT_DAILY_CHALLENGE_SUCCESS,
    SUBMIT_DAILY_CHALLENGE_FAILURE
} from '../../actions/actionTypes';

const initialState = {
    dailyChallenge: null,
    loading: false,
    error: null,
    completed: false,
    feedback: '',
    selectedAnswer: ''
};

const dailyChallengeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DAILY_CHALLENGE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DAILY_CHALLENGE_SUCCESS:
            return {
                ...state,
                loading: false,
                dailyChallenge: action.payload,
                completed: false,
                feedback: ''
            };
        case FETCH_DAILY_CHALLENGE_FAILURE:
            return { ...state, loading: false, error: action.error };
        case SUBMIT_DAILY_CHALLENGE_REQUEST:
            return { ...state, loading: true, error: null };
        case SUBMIT_DAILY_CHALLENGE_SUCCESS:
            return {
                ...state,
                loading: false,
                completed: true,
                feedback: action.payload.feedback
            };
        case SUBMIT_DAILY_CHALLENGE_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default dailyChallengeReducer;