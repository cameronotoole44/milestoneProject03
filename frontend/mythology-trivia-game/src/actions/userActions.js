import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from './actionTypes';

export const loginUser = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    access_token: data.access_token,
                    username: credentials.username
                }
            });
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: data.msg || 'Login failed'
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message || 'Login failed'
        });
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('currentUser');
    dispatch({ type: USER_LOGOUT });
};