import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Stack } from '@fluentui/react';

import routes from './routes';
import { Layout } from './Layout';

function App() {
    return (
        <Router>
            <Stack tokens={{ childrenGap: 10, padding: '1rem 1rem 0 1rem' }}>
                <Layout />
                {routes}
            </Stack>
        </Router>
    );
}

export default App;
