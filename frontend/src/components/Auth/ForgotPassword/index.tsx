import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, IStackTokens, Text, IIconProps, ActionButton } from '@fluentui/react';
import { Form, Button, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import { Logo } from '../../NavBar/Logo';
import { style } from '../styles';
import { RootUserState } from '../../../typings';
import { history } from '../../../index';
import { AuthLayout } from '../AuthLayout';

// TS infers type: (state: RootState)
const userSelector = (state: RootUserState) => state.user;

const stackToken: IStackTokens = { childrenGap: 35 };

// go back button icon props
const backIcon: IIconProps = { iconName: 'Back' };

const ForgotPassword = () => {
    const { loading } = useSelector(userSelector);
    const dispatch = useDispatch();

    const onFinish = (values: any) => {
        dispatch({
            type: 'user/FORGOT_PASSWORD',
            payload: values,
        });
    };

    return (
        <AuthLayout>
            <Stack tokens={stackToken} horizontalAlign="center">
                <Logo width={150} isMobileView={false}></Logo>
                <Text variant={'xLarge'}>Reset Password</Text>
                <Text className={style.lightText} variant="medium">
                    We will send you an email with a link on how to reset your password.
                </Text>
            </Stack>
            <Form
                name="forgot_password1"
                // initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                size="large"
                hideRequiredMark
                scrollToFirstError
                style={{ paddingTop: '2rem' }}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your E-mail' },
                        {
                            type: 'email',
                            message: 'The input is not a valid email address',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        style={{ borderRadius: '14px' }}
                        size="large"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Reset my Password
                    </Button>
                </Form.Item>
            </Form>
            <Stack horizontalAlign="center" styles={{ root: { paddingTop: '1rem' } }}>
                <ActionButton iconProps={backIcon} allowDisabledFocus onClick={() => history.goBack()}>
                    <Text className={style.backPadding} variant="large">
                        Go Back
                    </Text>
                </ActionButton>
            </Stack>
        </AuthLayout>
    );
};

export default ForgotPassword;
