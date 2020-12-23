import React from 'react';
import { useSelector } from 'react-redux';
import { usePaystackPayment } from 'react-paystack';
import { Button } from 'antd';

import { RootUserState } from '../../../typings';

const ENV = process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD';
const publicKey = process.env[`REACT_APP_${ENV}_PS_PUBKEY`] as string;

type Props = {
    amount: number;
    callback: Function;
};

const userSelector = (state: RootUserState) => state.user;

// TODO Implement server transaction verification

export function PayWithPaystack({ amount, callback }: Props) {
    const { email, name, id } = useSelector(userSelector);

    const splitName = name.split(' ');

    const config = {
        reference: `camfly-${Date.now()}`,
        email,
        amount: amount * 100,
        publicKey,
        firstName: splitName[0],
        lastName: splitName[1],
        metadata: {
            custom_field: [
                {
                    userId: id,
                },
            ],
        },
    };

    // handle on payment success callback
    const onSuccess = (reference: any) => {
        // console.log('success', reference);
        callback();
    };

    // handle on payment close / failed
    const onClose = () => {
        console.log('payment closed or cancelled');
    };

    const initializePayment = usePaystackPayment(config);

    return (
        <Button type="primary" size="middle" shape="round" onClick={() => initializePayment(onSuccess, onClose)}>
            Create
        </Button>
    );
}
