import React from 'react';
import { hot } from 'react-hot-loader/root';

import dva from './dva.png';

function App() {
    return (
        <>
            <h1 className="red">react-app</h1>
            <img src={dva} />
        </>
    );
}

export default hot(App);