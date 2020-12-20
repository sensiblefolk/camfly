import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, IStackTokens, Text } from '@fluentui/react';
import { Form, Button, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { Logo } from '../../NavBar/Logo';
import { RootUserState } from '../../../typings';
import { AuthLayout } from '../AuthLayout';

// TS infers type: (state: RootState)
const userSelector = (state: RootUserState) => state.user;

const stackToken: IStackTokens = { childrenGap: 35 };

const Login = () => {
    const [form] = Form.useForm();
    const { loading } = useSelector(userSelector);
    const dispatch = useDispatch();

    const onFinish = (values: any) => {
        dispatch({
            type: 'user/LOGIN',
            payload: values,
        });
    };

    return (
        <AuthLayout>
            <Stack tokens={stackToken} horizontalAlign="center">
                <Logo width={150} isMobileView={false}></Logo>
                <Text variant="xLarge">Log Into Your Account</Text>
            </Stack>
            <Form
                name="login-page"
                form={form}
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
                    label="Email"
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
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
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
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            <Stack tokens={{ childrenGap: 25 }} horizontalAlign="center">
                <Stack.Item>
                    <Link to="/auth/forgot-password">
                        <Text variant={'mediumPlus'}> Forgot password?</Text>
                    </Link>
                </Stack.Item>
                <Stack.Item>
                    <Text variant={'large'}>
                        Don't have an account?
                        <Link to="/auth/register">&nbsp; Sign Up</Link>
                    </Text>
                </Stack.Item>
            </Stack>
        </AuthLayout>
    );
};

export default Login;
