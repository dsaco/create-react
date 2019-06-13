import { fork, takeLatest, put } from 'redux-saga/effects';

import { ABOUT_REQUEST_LIST, ABOUT_RECEIVE_LIST } from '../actions/aboutAction';

const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

function* getList() {
    try {
        const list = yield delay(3000).then(() => {
            return [1, 2, 3];
        });
        yield put({
            type: ABOUT_RECEIVE_LIST,
            payload: { list },
        });
    } catch (e) {
        alert('error');
    }
}

function* watchGetList() {
    yield takeLatest(ABOUT_REQUEST_LIST, getList);
}

export default function* homeSaga() {
    yield fork(watchGetList);
}
