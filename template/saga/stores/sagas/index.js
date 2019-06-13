import { fork } from 'redux-saga/effects';

import aboutSaga from './aboutSaga';

export default function* rootSaga() {
    yield fork(aboutSaga);
}
