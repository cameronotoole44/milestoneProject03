import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import gameReducer from '../reducers/gameReducer';


const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
});
export default rootReducer;