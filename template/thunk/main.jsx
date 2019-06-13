import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './pages/App';
import store from './stores';

const root = (
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
);

ReactDOM.render(root, document.querySelector('#root'));
