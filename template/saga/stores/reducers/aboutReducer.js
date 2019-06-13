import { ABOUT_RECEIVE_LIST } from '../actions/aboutAction';

const aboutReducer = (state = {
    list: [],
}, action) => {
    switch (action.type) {
        case ABOUT_RECEIVE_LIST:
            return Object.assign({}, state, { ...action.payload });
        default:
            return state;
    }
};

export default aboutReducer;
