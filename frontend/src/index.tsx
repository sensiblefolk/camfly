import React from 'react';
import ReactDOM from 'react-dom';
import { loadTheme, initializeIcons } from '@fluentui/react';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import createRootReducer from './redux/reducers';
import sagas from './redux/saga';
import './index.less';
import { lightTheme } from './customizedTheme';
import App from './App';
import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory();

// store configuration details
// const store = configureStore();
const sagaMiddleware = createSagaMiddleware();
const composeEnhancer: typeof compose =
    (process.env.NODE_ENV !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    createRootReducer(history),
    composeEnhancer(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);
sagaMiddleware.run(sagas);

initializeIcons();
loadTheme(lightTheme);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App history={history} />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

export { store, history };

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
