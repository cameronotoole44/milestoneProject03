import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../../actions/actionTypes';

const loadUserInfo = () => {
    try {
        const userInfo = localStorage.getItem('currentUser');
        if (userInfo) {
            const parsedInfo = JSON.parse(userInfo);
            if (new Date() > new Date(parsedInfo.expiresAt)) {
                localStorage.removeItem('currentUser');
                return null;
            }
            return parsedInfo;
        }
        return null;
    } catch (e) {
        console.error('Failed to parse userInfo from localStorage:', e);
        localStorage.removeItem('currentUser');
        return null;
    }
};

const initialState = {
    currentUser: loadUserInfo(),
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case USER_LOGIN_SUCCESS:
            console.log('USER_LOGIN_SUCCESS:', action.payload);
            const newUserState = {
                ...state,
                currentUser: {
                    ...action.payload,
                    username: action.payload.username || state.currentUser?.username,
                    expiresAt: action.payload.expiresAt
                },
                loading: false,
                error: null,
            };
            localStorage.setItem('currentUser', JSON.stringify(newUserState.currentUser));
            return newUserState;
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case USER_LOGOUT:
            localStorage.removeItem('currentUser');
            return {
                ...state,
                currentUser: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userReducer;
