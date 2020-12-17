export const SET_STATE = 'settings/SET_STATE';
export const CHANGE_SETTINGS = 'settings/CHANGE_SETTING';

export interface SettingState {
    isMobileView: boolean;
    isMobileMenuOpen?: boolean;
}

interface SetStateAction {
    type: typeof SET_STATE;
    payload: SettingState;
}

interface ChangeSettingAction {
    type: typeof CHANGE_SETTINGS;
    payload?: any;
}

export type SettingActionTypes = SetStateAction | ChangeSettingAction;
