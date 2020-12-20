import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Stack, IStackTokens, Text } from '@fluentui/react';
import { Form, Button, Input, Select, Checkbox, Row, Col } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

import { Logo } from '../../NavBar/Logo';
import { style } from '../styles';
import { RootUserState } from '../../../typings';
import { AuthLayout } from '../AuthLayout';

// TS infers type: (state: RootState)
const userSelector = (state: RootUserState) => state.user;

const stackToken: IStackTokens = { childrenGap: 15 };

const { Option } = Select;

const Register = () => {
    const [form] = Form.useForm();
    const { loading } = useSelector(userSelector);
    const dispatch = useDispatch();
    const { search } = useLocation();

    const countryCodeSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 80 }}>
                <Option value="234">+234</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = (values: any) => {
        dispatch({
            type: 'user/REGISTER_EMAIL',
            payload: {
                ...values,
                referred: false,
            },
        });
    };

    return (
        <AuthLayout>
            <Stack tokens={stackToken} horizontalAlign="center">
                <Logo width={150} isMobileView={false}></Logo>
                <Text variant="xLarge">Create an Account</Text>
            </Stack>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    prefix: '234',
                    referralCode: search ? search.split('?')[1] : '',
                }}
                hideRequiredMark
                scrollToFirstError
                style={{ paddingTop: '1rem' }}
            >
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your First Name!',
                                },
                            ]}
                            name="firstname"
                        >
                            <Input prefix={<UserOutlined />} placeholder="First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Last Name!',
                                },
                            ]}
                            name="lastname"
                        >
                            <Input prefix={<UserOutlined />} placeholder="Last Name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not a valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                        },
                    ]}
                >
                    <Checkbox>
                        <Text variant="medium">
                            By creating an account, you agree to the{' '}
                            <Link className={style.linkColor} to="#">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link className={style.linkColor} to="#">
                                Privacy Policy
                            </Link>
                        </Text>
                    </Checkbox>
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
                        Create Account
                    </Button>
                </Form.Item>
            </Form>
            <Stack tokens={{ childrenGap: 25 }} horizontalAlign="center">
                <Stack.Item>
                    <Text variant={'large'}>
                        Already have an account?
                        <Link to="/auth/login">&nbsp; Sign In</Link>
                    </Text>
                </Stack.Item>
            </Stack>
        </AuthLayout>
    );
};

export default Register;
