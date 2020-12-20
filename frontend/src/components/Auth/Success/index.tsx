import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, IStackTokens, Text, Image } from '@fluentui/react';

const stackToken: IStackTokens = { childrenGap: 45 };

export const Success = () => {
    return (
        <Stack tokens={stackToken} horizontalAlign="center">
            <Image src="../../../../assets/success.png" />
            <Stack tokens={{ childrenGap: 10 }} horizontalAlign="center">
                <Text variant="xLarge">Thank you for registering for Camfly.</Text>
                <Text variant="medium">
                    A verification mail has been sent to your email address, Please check your mail to verify your
                    account.
                </Text>
            </Stack>
            <Stack.Item>
                <Text variant={'large'}>
                    Email already verified?
                    <Link to="/auth/login">&nbsp; Log In</Link>
                </Text>
            </Stack.Item>
        </Stack>
    );
};
