import { SettingState, SettingActionTypes, SET_STATE } from './types';
import store from 'store';

const STORED_SETTINGS = (storedSettings: { [x: string]: any }) => {
    const settings: any = {};
    Object.keys(storedSettings).forEach(key => {
        const item = store.get(`app.settings.${key}`);
        settings[key] = typeof item !== 'undefined' ? item : storedSettings[key];
    });
    return settings;
};

const initialState: SettingState = {
    ...STORED_SETTINGS({
        isMobileView: false,
        isMobileMenuOpen: false,
    }),
};

export const settingsReducer = (state = initialState, action: SettingActionTypes): SettingState => {
    switch (action.type) {
        case SET_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
