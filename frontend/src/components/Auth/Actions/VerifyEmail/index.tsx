import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Spinner, SpinnerSize } from '@fluentui/react';

type Props = {
    searchParams: string;
};

export const VerifyEmail = ({ searchParams }: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'user/VERIFY_EMAIL',
            payload: { query: searchParams },
        });
    }, [dispatch, searchParams]);
    return (
        <Stack
            tokens={{ childrenGap: 10, padding: 50 }}
            horizontalAlign="center"
            verticalAlign="center"
            styles={{ root: { paddingTop: '2rem' } }}
        >
            <Spinner size={SpinnerSize.large} label="verifying email"></Spinner>
        </Stack>
    );
};
