import React from 'react';
import { Redirect } from 'react-router-dom';

import {PasswordReset} from './PasswordReset';
import { VerifyEmail } from './VerifyEmail';
import { history } from '../../../index';
import { getParams } from '../../../services/user';

const Actions = () => {
    const searchParams = history.location.search;

    if (!searchParams) {
        return <Redirect to="/auth/login" />;
    } else {
        const { mode } = getParams(searchParams) as any;
        if (mode === 'resetPassword') {
            return <PasswordReset />;
        }
        return <VerifyEmail searchParams={searchParams} />;
    }
};

export default Actions;
