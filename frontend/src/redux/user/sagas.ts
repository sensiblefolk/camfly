/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { all, takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import { message } from 'antd';
import dayJs from 'dayjs';

import { history } from '../../index';
import { isAuthLayout } from '../../services/helper';
import {
    login,
    currentAccount,
    registerEmail,
    logout,
    sendUserVerificationEmail,
    forgotPassword,
    passwordReset,
    verifyEmail,
} from '../../services/user';
import {
    LOGIN,
    LOAD_CURRENT_ACCOUNT,
    LOGOUT,
    REGISTER_EMAIL,
    FORGOT_PASSWORD,
    PASSWORD_RESET,
    VERIFY_EMAIL,
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

type IRegisterEmail = {
    payload: {
        email: string;
        password: string;
        firstname: string;
        lastname: string;
    };
};

export function* RegisterEmail({ payload }: IRegisterEmail) {
    const { email, password, firstname, lastname } = payload;
    const fullname = `${firstname} ${lastname}`;
    yield put({
        type: 'user/SET_STATE',
        payload: {
            loading: true,
        },
    });
    const success = yield call(registerEmail, email.trim(), fullname.trim(), password);

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

    if (response) {
        const { uid: id, email, photoURL: avatar, displayName: name, emailVerified, metadata } = response;
        const creationTime = dayJs(metadata?.creationTime).valueOf();
        const lastSignInTime = dayJs(metadata?.lastSignInTime).valueOf();

        if (emailVerified) {
            yield put({
                type: 'user/SET_STATE',
                payload: {
                    id,
                    name,
                    email,
                    currency: 'USD',
                    emailVerified,
                    avatar,
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
        takeLatest(REGISTER_EMAIL as any, RegisterEmail),
        takeEvery(LOAD_CURRENT_ACCOUNT as any, LoadCurrentAccount),
        takeLatest(LOGOUT as any, LogOut),
        LoadCurrentAccount(), // run once on app load to check user auth
    ]);
}
