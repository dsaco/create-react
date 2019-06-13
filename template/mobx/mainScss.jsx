import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import App from './pages/App';
import stores from './stores';
import './styles/main.scss';

const root = (
    <Provider {...stores}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
);

ReactDOM.render(root, document.querySelector('#root'));
