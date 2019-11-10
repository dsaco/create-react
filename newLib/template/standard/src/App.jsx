import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Link } from 'react-router-dom';

import { routes, RouteWithSubRoutes } from './routes';

function App() {
	return (
		<>
			<Link to="/">home</Link>&nbsp;&nbsp;&nbsp;
			<Link to="/test">test</Link>&nbsp;&nbsp;&nbsp;
			<Switch>
				{routes.map((route, i) => (
					<RouteWithSubRoutes key={i} {...route} />
				))}
			</Switch>
		</>
	);
}

export default hot(App);
