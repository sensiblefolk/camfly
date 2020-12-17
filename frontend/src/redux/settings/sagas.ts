/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { all, takeEvery, put } from 'redux-saga/effects';
import store from 'store';
import qs from 'qs';
import { history, store as reduxStore } from '../../index';
import { CHANGE_SETTINGS } from './types';

export function* CHANGE_SETTING({
    payload: { setting, value },
}: {
    payload: { setting: string; value: boolean | string };
}) {
    yield store.set(`app.settings.${setting}`, value);
    yield put({
        type: 'settings/SET_STATE',
        payload: {
            [setting]: value,
        },
    });
}

export function* SETUP() {
    // load settings from url on app load
    const changeSettings = (search: string) => {
        const query = qs.parse(search, { ignoreQueryPrefix: true });
        Object.keys(query).forEach((key) => {
            let value;
            switch (query[key]) {
                case 'false':
                    value = false;
                    break;
                case 'true':
                    value = true;
                    break;
                default:
                    value = query[key];
                    break;
            }
            console.log('settings', key);
            reduxStore.dispatch({
                type: 'settings/CHANGE_SETTING',
                payload: {
                    setting: key,
                    value,
                },
            });
        });
    };
    yield changeSettings(history.location.search);
    yield history.listen((params: any) => {
        const { search } = params;
        changeSettings(search);
    });

    // detect isMobileView setting on app load and window resize
    const isMobileView = (load = false) => {
        const currentState = window.innerWidth < 768;
        const prevState = store.get('app.settings.isMobileView');
        if (currentState !== prevState || load) {
            reduxStore.dispatch({
                type: 'settings/CHANGE_SETTING',
                payload: {
                    setting: 'isMobileView',
                    value: currentState,
                },
            });
        }
    };

    yield isMobileView(true);
    yield window.addEventListener('resize', () => {
        isMobileView();
    });
}

export default function* rootSaga() {
    yield all([
        takeEvery(CHANGE_SETTINGS as any, CHANGE_SETTING),
        SETUP(), // run once on app load
    ]);
}
