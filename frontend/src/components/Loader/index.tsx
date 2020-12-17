import React from 'react';
import { Stack, Spinner, SpinnerSize } from '@fluentui/react';

export const Loader = () => {
    return (
        <Stack tokens={{ padding: 2 }}>
            <Stack.Item align="end">
                <Spinner size={SpinnerSize.medium} />
            </Stack.Item>
        </Stack>
    );
};
