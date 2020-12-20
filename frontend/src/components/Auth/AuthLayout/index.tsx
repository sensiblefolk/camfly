import React from 'react';
import { Stack } from '@fluentui/react';

type Props = {
    children: JSX.Element[] | JSX.Element;
};

export const AuthLayout = ({ children }: Props) => {
    return (
        <Stack tokens={{ maxWidth: 500 }} style={{ margin: '0 auto' }}>
            {children}
        </Stack>
    );
};
