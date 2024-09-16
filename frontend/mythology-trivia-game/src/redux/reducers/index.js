import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import gameReducer from '../reducers/gameReducer';
import dailyChallengeReducer from '../reducers/dailyChallengeReducer';


const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    dailyChallenges: dailyChallengeReducer,
});
export default rootReducer;