import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middleware.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleware));

sagaMiddleware.run(sagas);

export default store;
