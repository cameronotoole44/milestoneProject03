
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import gameReducer from './reducers/gameReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        game: gameReducer,
    },
});

export default store;
