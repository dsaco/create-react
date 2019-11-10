import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './App';
import store from './stores';
import './styles/main.scss';

const root = (
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
);

ReactDOM.render(root, document.querySelector('#root'));
