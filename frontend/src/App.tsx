import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Stack } from '@fluentui/react';

import routes from './routes';
import { Layout } from './Layout';

interface AppProps {
    history: History;
}

function App({ history }: AppProps) {
    return (
        <ConnectedRouter history={history}>
            <Stack tokens={{ childrenGap: 10, padding: '1rem 1rem 0 1rem' }}>
                <Layout />
                {routes}
            </Stack>
        </ConnectedRouter>
    );
}

export default App;
