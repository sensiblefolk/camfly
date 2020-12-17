import { combineReducers } from 'redux';
import { userReducer } from './user/reducers';
import { settingsReducer } from './settings/reducers';

const rootReducer = () =>
    combineReducers({
        user: userReducer,
        settings: settingsReducer,
    });

export interface State {
    user: object;
    settings: object;
}

export default rootReducer;
