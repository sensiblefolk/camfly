import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import NoMatch from '../components/NoMatch';
import { Loader } from '../components/Loader';

const lazyLoading = (loader: any) => {
    return loadable(loader, {
        fallback: <Loader />,
    });
};

const routesPath = [
    //home
    {
        path: '/',
        key: 'home',
        exact: true,
        component: lazyLoading(() => import('../pages/views/home')),
    },
    // Campaign
    {
        path: '/campaign',
        key: 'campaign',
        exact: true,
        component: lazyLoading(() => import('../pages/views/campaign')),
    },
    {
        path: '/campaign/:id/:title',
        key: 'campaign-session',
        exact: true,
        component: lazyLoading(() => import('../pages/views/campaign/new-campaign')),
    },
    {
        path: '/auth/login',
        key: 'login',
        component: lazyLoading(() => import('../pages/auth/login')),
        exact: true,
    },
    {
        path: '/auth/register',
        key: 'register',
        component: lazyLoading(() => import('../pages/auth/register')),
        exact: true,
    },
    {
        path: '/auth/forgot-password',
        key: 'forgot-password',
        component: lazyLoading(() => import('../pages/auth/forgot-password')),
        exact: true,
    },
    {
        path: '/auth/actions',
        key: 'actions',
        component: lazyLoading(() => import('../pages/auth/actions')),
        exact: true,
    },
    {
        path: '/auth/success',
        key: 'success',
        component: lazyLoading(() => import('../pages/auth/success')),
        exact: true,
    },
];

const routes = (
    <div>
        <Switch>
            {routesPath.map((routePath) => (
                <Route
                    path={routePath.path}
                    exact={routePath.exact}
                    key={routePath.key}
                    component={routePath.component}
                />
            ))}
            <Route component={NoMatch} />
        </Switch>
    </div>
);

export default routes;
