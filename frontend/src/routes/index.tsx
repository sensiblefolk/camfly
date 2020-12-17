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
