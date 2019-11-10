import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
	const { logger } = require('redux-logger');
	middleware.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;
