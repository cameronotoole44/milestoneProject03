import { ACTIVATE_POWERUP_SUCCESS, ACTIVATE_POWERUP_FAILURE } from '../actions/powerUpActions';

const initialState = {
    activePowerUps: [],
    error: null,
    message: ''
};

export const powerUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVATE_POWERUP_SUCCESS:
            return {
                ...state,
                activePowerUps: [...state.activePowerUps, action.payload.powerupName],
                message: action.payload.message,
                error: null
            };
        case ACTIVATE_POWERUP_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: ''
            };
        default:
            return state;
    }
};