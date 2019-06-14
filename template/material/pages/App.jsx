import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Link } from 'react-router-dom';
import { routes, RouteWithSubRoutes } from '../routes';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

class App extends Component {
    render() {
        return (
            <Container maxWidth="md">
                <AppBar position="static">
                    <Toolbar>
                        <Link style={{color: 'white'}} to="/" ><HomeIcon style={{ verticalAlign: 'bottom'}} />&nbsp;home</Link>
                        &nbsp;&nbsp;
                        <Link style={{color: 'white'}} to="/about" ><InfoIcon style={{ verticalAlign: 'bottom'}} />&nbsp;about</Link>
                    </Toolbar>
                </AppBar>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </Container>
        );
    }
}

export default hot(App);
