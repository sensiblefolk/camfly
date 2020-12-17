export const SET_STATE = 'user/SET_STATE';
export const LOGIN = 'user/LOGIN';
export const LOGIN_WITH_GOOGLE = 'user/LOGIN_WITH_GOOGLE';
export const LOAD_CURRENT_ACCOUNT = 'user/LOAD_CURRENT_ACCOUNT';
export const LOGOUT = 'user/LOGOUT';
export const REGISTER_EMAIL = 'user/REGISTER_EMAIL';
export const REGISTER_AUTH_PROVIDERS = 'user/REGISTER_AUTH_PROVIDERS';
export const FORGOT_PASSWORD = 'user/FORGOT_PASSWORD';
export const PASSWORD_RESET = 'user/PASSWORD_RESET';
export const VERIFY_EMAIL = 'user/VERIFY_EMAIL';

export interface UserState {
    id: string;
    name: string;
    userName?: string;
    role: string;
    email: string;
    emailVerified: boolean;
    avatar: string;
    authorized: boolean;
    identityVerified?: boolean;
    loading: boolean;
    currency?: string;
    country?: string;
    occupation?: string;
    address?: string;
    dateofbirth?: string;
    city?: string;
    gender?: string;
    nextOfKin?: string;
    phone?: string;
    state?: string;
    prevLocation?: string;
    creationTime?: number | null;
    lastSignInTime?: number | null;
}

interface SetStateAction {
    type: typeof SET_STATE;
    payload: UserState;
}

interface LoginAction {
    type: typeof LOGIN;
    payload: {
        email: string;
        password: string;
    };
}

interface RegisterEmailAction {
    type: typeof REGISTER_EMAIL;
    payload: {
        email: string;
        password: string;
        fullname: string;
        userName?: string;
    };
}

interface ForgotPasswordAction {
    type: typeof FORGOT_PASSWORD;
    payload: {
        email: string;
    };
}

interface PasswordResetAction {
    type: typeof PASSWORD_RESET;
    payload: {
        password: string;
        query: string;
    };
}

interface LoginWithGoogleAction {
    type: typeof LOGIN_WITH_GOOGLE;
}

interface RegisterAuthProviders {
    type: typeof REGISTER_AUTH_PROVIDERS;
}

interface LoadCurrentAccount {
    type: typeof LOAD_CURRENT_ACCOUNT;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type UserActionTypes =
    | SetStateAction
    | LoginAction
    | RegisterEmailAction
    | ForgotPasswordAction
    | PasswordResetAction
    | LoginWithGoogleAction
    | RegisterAuthProviders
    | LoadCurrentAccount
    | LogoutAction;
