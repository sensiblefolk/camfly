import { UserState } from './redux/user/types';
import { SettingState } from './redux/settings/types';

// Interface for user reducer
export interface RootUserState {
    user: UserState;
}

// Interface for settings reducer
export interface RootSettingState {
    settings: SettingState;
}

// Interface for routerState reducer
export interface RootRouterState {
    router: {
        location: {
            pathname: string;
            search: string;
            hash: string;
            key: string | number;
            query: object;
        };
        action: string;
    };
}

/* Grapqhql table types */
export interface IWallet {
    balance: number;
    currency: string;
    heldBalance: number;
    id: number;
}

export interface ITransactions {
    id: string;
    amount: number;
    created_at: string;
    currency: string;
    loan_id: string;
    depositor_name: string;
    depositor_username: string;
    wallet_id: number;
    isforgiven: boolean;
}

export interface INotification {
    created_at: string;
    id: string;
    message: string;
    url?: string;
}
