import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../pages/Home';
import Test from '../pages/test';

export const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/test',
        component: Test,
        exact: true,
    },
];

export const RouteWithSubRoutes = (route) => {
    return (
        <Route
            path={route.path}
            render={(props) => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
};
