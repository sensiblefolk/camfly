import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { userReducer } from './user/reducers';
import { settingsReducer } from './settings/reducers';

const rootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        settings: settingsReducer,
    });

export interface State {
    user: object;
    settings: object;
    router: RouterState;
}

export default rootReducer;
