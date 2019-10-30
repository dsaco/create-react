import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import dva from './dva.png';

class App extends Component {
    render() {
        return (
            <>
                <h1 className="red">react-app</h1>
                <img src={dva} />
            </>
        );
    }
}

export default hot(App);