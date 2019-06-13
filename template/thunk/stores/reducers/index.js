
import { combineReducers } from 'redux';

import aboutReducer from './aboutReducer';

export default combineReducers({
    about: aboutReducer,
});
