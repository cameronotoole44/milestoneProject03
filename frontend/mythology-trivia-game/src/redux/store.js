
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import gameReducer from './reducers/gameReducer';
import dailyChallengeReducer from './reducers/dailyChallengeReducer';


const store = configureStore({
    reducer: {
        user: userReducer,
        game: gameReducer,
        dailyChallenges: dailyChallengeReducer,
    },
});

export default store;
