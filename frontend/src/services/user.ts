import firebase from 'firebase/app';
import { notification, message } from 'antd';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// import 'firebase/analytics';
import dayjs from 'dayjs';

// get current node running enviroment
const enviroment = 'PROD';
const firebaseConfig = {
    apiKey: process.env[`REACT_APP_FIREBASE_${enviroment}_APIKEY`],
    authDomain: process.env[`REACT_APP_FIREBASE_${enviroment}_AUTHDOMAIN`],
    databaseURL: process.env[`REACT_APP_FIREBASE_${enviroment}_DATABASEURL`],
    projectId: process.env[`REACT_APP_FIREBASE_${enviroment}_PROJECTID`],
    storageBucket: process.env[`REACT_APP_FIREBASE_${enviroment}_STORAGEBUCKET`],
    messagingSenderId: process.env[`REACT_APP_FIREBASE_${enviroment}_MESSAGESENDERID`],
    appId: process.env[`REACT_APP_FIREBASE_${enviroment}_APPID`],
    measurementId: process.env[`REACT_APP_FIREBASE_${enviroment}_MEASUREMENTID`],
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.analytics();
export const firebaseAuth = firebase.auth;

export default firebaseApp;

export async function login(email: string, password: string) {
    return firebaseAuth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            // firebaseApp.analytics().logEvent('login', { user: firebaseAuth().currentUser?.uid });
            return true;
        })
        .catch((error) => {
            notification.warning({
                message: 'Log In Error',
                description: "Email or Password not recognized",
            });
        });
}

async function updateProfile(name: string, user: any) {
    const { uid, email } = user;
    const userRef = firebase.database().ref(`users/${uid}`);
    return userRef
        .set({ name, email, currency: 'USD', role: 'user' })
        .then(() => true)
        .catch((_error) => false);
}

export async function registerEmail(email: string, name: string, password: string) {
    return firebaseAuth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
            await updateProfile(name, result?.user);
            return result;
        })
        .catch((error) => {
            notification.warning({
                message: 'Registration Error',
                description: error.message,
            });
        });
}

export async function currentAccount() {
    const firebaseUser = getCurrentUser(firebaseAuth());
    return firebaseUser
}

// get current user from firebase auth instance
function getCurrentUser(auth: firebase.auth.Auth) {  
        return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged( (user: any) => {
                unsubscribe();
                if (user && !user?.displayName) {
                    const userRef = firebase.database().ref(`users/${user?.uid}`);
                    userRef.once('value').then((userData) => {
                        const userValue = userData.val();
                        resolve({ displayName: userValue?.name, ...user });
                    });
                } else {
                    resolve(user);
                }
            }, reject);
        });
};

export async function sendUserVerificationEmail() {
    const user = firebaseAuth().currentUser;

    user?.sendEmailVerification()
        .then(() => {
            notification.success({
                message: 'Email Sent',
                description: 'Check your mail to verify your email address',
            });
            return true;
        })
        .catch((_error) => {
            message.error('Failed sending verification email');
            return false;
        });
}

export async function forgotPassword(email: string) {
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(email)
        .then(async () => {
            await message.success('Check your email to reset your password');
            return true;
        })
        .catch((_error) => {
            // An error happened.
            message.error('user not found');
            return false;
        });
}

type ParamsModeType = {
    mode?: string;
    [propName: string]: any;
};

export async function passwordReset(password: string, query: string) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const params: ParamsModeType = getParams(query);
    let response;
    // Handle the user management action.
    if (params?.mode === 'resetPassword') {
        response = handleResetPassword(params.oobCode, password);
    }
    return response;
}

export async function verifyEmail(query: string) {
    const params: ParamsModeType = getParams(query);
    try {
        await firebaseAuth().applyActionCode(params?.oobCode);
        message.success('Email verified successfully');
        return true;
    } catch (error) {
        // message.error(`failed verifying email address, ${error.message}`);
        return false;
    }
}

export async function logout() {
    localStorage.removeItem('id');
    return firebaseAuth()
        .signOut()
        .then(() => true);
}

export const forceTokenRefresh = async () => {
    firebaseAuth().onIdTokenChanged(async (user) => {
        if (user) {
            const token = await user.getIdToken();
            const idTokenResult = await user.getIdTokenResult();
            const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];

            if (hasuraClaim) {
                const expiredTime = dayjs(idTokenResult.expirationTime).valueOf();
                const currentTime = dayjs().valueOf();
                if (currentTime >= expiredTime) {
                    const refreshedToken = user.getIdToken(true);
                    // console.log('refreshed token', refreshedToken);
                    return refreshedToken;
                }
                return token;
            }
        }
        return null;
    });
};

type RetValtype = {
    [propName: string]: string;
};

export const getParams = (params: string): object => {
    const inputValue = params.split('?');
    const input = inputValue[1];
    const retVal: RetValtype = {};
    let fromIndex = 0;
    let toIndex = 0;
    while (toIndex !== -1) {
        let key = '';
        let value = '';
        toIndex = input.indexOf('=', fromIndex);
        if (toIndex - fromIndex > 1) {
            key = input.substring(fromIndex, toIndex);
            fromIndex = toIndex + 1;
            toIndex = input.indexOf('&', fromIndex);
            if (toIndex === -1) {
                value = input.substring(fromIndex, input.length);
            } else {
                value = input.substring(fromIndex, toIndex);
            }
            retVal[key] = value;
            fromIndex = toIndex + 1;
        } else {
            fromIndex = input.indexOf('&', toIndex) + 1;
        }
    }
    return retVal;
};

const handleResetPassword = async (actionCode: string, password: string) => {
    try {
        await firebaseAuth().verifyPasswordResetCode(actionCode);
        try {
            await firebaseAuth().confirmPasswordReset(actionCode, password);
            return true;
        } catch (error) {
            message.error('error changing password');
            return false;
        }
    } catch (error) {
        message.error('Session has expired please try again');
        return false;
    }
};
