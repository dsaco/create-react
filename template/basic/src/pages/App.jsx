import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Link } from 'react-router-dom';
import { routes, RouteWithSubRoutes } from '../routes';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" >home</Link>
                &nbsp;
                <Link to="/about" >about</Link>
                <h1>app</h1>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </React.Fragment>
        );
    }
}

export default hot(App);
