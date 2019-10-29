import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Link } from 'react-router-dom';

import { routes, RouteWithSubRoutes } from './routes';

class App extends Component {
    render() {
        return (
            <>
                <Link to="/" >home</Link>
                &nbsp;
                <Link to="/test" >test</Link>
                <h1>react-app</h1>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </>
        );
    }
}

export default hot(App);