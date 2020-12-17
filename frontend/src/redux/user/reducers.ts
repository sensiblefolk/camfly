import { UserState, UserActionTypes, SET_STATE } from './types';

const initialState: UserState = {
    id: '',
    name: '',
    role: '',
    email: '',
    emailVerified: false,
    avatar: '',
    currency: 'USD',
    address: '',
    dateofbirth: '',
    gender: '',
    nextOfKin: '',
    phone: '',
    state: '',
    identityVerified: false,
    authorized: false,
    loading: false,
    creationTime: null,
    lastSignInTime: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case SET_STATE:
            return { ...state, ...action?.payload };
        default:
            return state;
    }
};
