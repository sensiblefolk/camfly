/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { all, takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import { message } from 'antd';
import dayJs from 'dayjs';

import { history } from '../../index';
import { isAuthLayout } from '../../services/helper';
import {
    login,
    loginWithGoogle,
    currentAccount,
    registerEmail,
    logout,
    sendUserVerificationEmail,
    forgotPassword,
    passwordReset,
    verifyEmail,
    getUserAccountFromDatabase,
} from '../../services/user';
import {
    LOGIN,
    LOGIN_WITH_GOOGLE,
    LOAD_CURRENT_ACCOUNT,
    LOGOUT,
    REGISTER_EMAIL,
    FORGOT_PASSWORD,
    PASSWORD_RESET,
    VERIFY_EMAIL,
    UserState,
} from './types';
import { cache } from '../../configureApollo';

let prevLocation: string | null = null;
let onVerifyEmailTrigger = false;

export function* ForgotPassword({ payload }: { payload: { email: string } }) {
    const { email } = payload;
    const success = yield call(forgotPassword, email);
    if (success) {
        yield history.push('/auth/login');
    }
}
export function* PasswordReset({ payload }: { payload: { password: string; query: string } }) {
    const { password, query } = payload;
    yield call(passwordReset, password, query);
    yield history.push('/auth/login');
}

export function* VerifyEmail({ payload }: { payload: { query: string } }) {
    const { query } = payload;
    yield call(verifyEmail, query);
    yield history.push('/auth/login');
}

export function* Login({ payload }: { payload: { password: string; email: string } }) {
    const { email, password } = payload;
    yield put({
        type: 'user/SET_STATE',
        payload: {
            loading: true,
        },
    });
    const success = yield call(login, email.trim(), password.trim());

    if (success) {
        onVerifyEmailTrigger = true;
        yield put({
            type: 'user/LOAD_CURRENT_ACCOUNT',
        });
    }

    yield put({
        type: 'user/SET_STATE',
        payload: {
            loading: false,
        },
    });
}

export function* LoginWithGoogle() {
    const success = yield call(loginWithGoogle);
    yield put({ type: 'user/LOAD_CURRENT_ACCOUNT' });
    if (success) {
        const navigateTo = prevLocation ? prevLocation : '/';
        yield history.push(navigateTo);
        yield message.success('You are logged in');
    }
}

type IRegisterEmail = {
    payload: {
        email: string;
        password: string;
        firstname: string;
        lastname: string;
        phone: string;
        referred: boolean;
        referralCode: string;
    };
};

export function* RegisterEmail({ payload }: IRegisterEmail) {
    const { email, password, firstname, lastname, phone, referred, referralCode } = payload;
    const fullname = `${firstname} ${lastname}`;
    yield put({
        type: 'user/SET_STATE',
        payload: {
            loading: true,
        },
    });
    const success = yield call(registerEmail, email.trim(), fullname.trim(), phone, password, referred, referralCode);

    if (success) {
        onVerifyEmailTrigger = true;
        yield put({
            type: 'user/LOAD_CURRENT_ACCOUNT',
        });

        // const firstName = fullname.split(' ');
        // notification.success({
        //     message: `Hi ${firstName[0]}`,
        //     description: 'Account created successfully',
        // })
        yield history.push('/auth/success');
    }

    yield put({
        type: 'user/SET_STATE',
        payload: {
            loading: false,
        },
    });
}

export function* LoadCurrentAccount() {
    const response = yield call(currentAccount);
    const user: UserState = yield call(getUserAccountFromDatabase);

    if (response) {
        const { currency, address, state, gender, nextOfKin, dateofbirth, phone, country, occupation } = user;
        const { uid: id, email, photoURL: avatar, displayName: name, emailVerified, metadata } = response;
        const creationTime = dayJs(metadata?.creationTime).valueOf();
        const lastSignInTime = dayJs(metadata?.lastSignInTime).valueOf();

        if (emailVerified) {
            yield put({
                type: 'user/SET_STATE',
                payload: {
                    id,
                    name: user?.name || name,
                    email: user?.email || email,
                    currency,
                    address,
                    state,
                    gender,
                    nextOfKin,
                    occupation,
                    country,
                    dateofbirth,
                    phone,
                    emailVerified,
                    avatar: user?.avatar || avatar,
                    role: 'user',
                    authorized: true,
                    creationTime,
                    lastSignInTime,
                },
            });

            localStorage.setItem('id', id);

            // only trigger if login and register action was dispatched
            if (onVerifyEmailTrigger) {
                const navigateTo = prevLocation && !isAuthLayout(prevLocation) ? prevLocation : '/';
                const hoursFromUserCreation = dayJs(creationTime).add(2, 'hour').valueOf();
                const shouldNavigateUser = Date.now() <= hoursFromUserCreation ? '/' : navigateTo;
                yield history.push(shouldNavigateUser);
                yield message.success('You are logged in');
            }
        }
        if (onVerifyEmailTrigger && !emailVerified) {
            const emailSent = yield call(sendUserVerificationEmail);
            if (emailSent) yield put({ type: 'user/LOG_OUT' });
        }
    }
    yield put({
        type: 'user/SET_STATE',
        payload: {
            loading: false,
        },
    });
}

export function* LogOut() {
    yield call(logout);
    // yield message.success('You are logged out');
    prevLocation = history.location.pathname + history.location.search;
    yield put({
        type: 'user/SET_STATE',
        payload: {
            id: '',
            name: '',
            role: '',
            email: '',
            currency: '',
            address: '',
            dateofbirth: '',
            gender: '',
            nextOfKin: '',
            phone: '',
            state: '',
            country: '',
            occupation: '',
            emailVerified: false,
            avatar: '',
            authorized: false,
            identityVerified: false,
            loading: false,
        },
    });
    cache.reset().then(() => true);
    cache.gc();
    yield history.push('/auth/login');
}

export default function* rootSaga() {
    yield all([
        takeLatest(LOGIN as any, Login),
        takeLatest(VERIFY_EMAIL as any, VerifyEmail),
        takeLatest(FORGOT_PASSWORD as any, ForgotPassword),
        takeLatest(PASSWORD_RESET as any, PasswordReset),
        takeLatest(LOGIN_WITH_GOOGLE as any, LoginWithGoogle),
        takeLatest(REGISTER_EMAIL as any, RegisterEmail),
        takeEvery(LOAD_CURRENT_ACCOUNT as any, LoadCurrentAccount),
        takeLatest(LOGOUT as any, LogOut),
        LoadCurrentAccount(), // run once on app load to check user auth
    ]);
}
