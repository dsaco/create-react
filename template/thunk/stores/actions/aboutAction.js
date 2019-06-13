export const ABOUT_REQUEST_LIST = 'ABOUT_REQUEST_LIST';
export const ABOUT_RECEIVE_LIST = 'ABOUT_RECEIVE_LIST';

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export const fetchList = () => {
    return (dispatch) => {
        dispatch({type: ABOUT_REQUEST_LIST});
        return delay(3000).then(()  => {
            dispatch({type: ABOUT_RECEIVE_LIST, payload: { list: [1, 2, 3] }});
        });
    };
};
