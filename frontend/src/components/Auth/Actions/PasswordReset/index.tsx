import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Stack, IStackTokens, Text } from '@fluentui/react';
import { Form, Button, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';

import { Logo } from '../../../NavBar/Logo';
import { RootUserState } from '../../../../typings';
import { useForm } from 'antd/lib/form/Form';

// TS infers type: (state: RootState)
const userSelector = (state: RootUserState) => state.user;

const stackToken: IStackTokens = { childrenGap: 35 }

export const PasswordReset = () => {
  const [form] = useForm();
  const { loading } = useSelector(userSelector);
  const { search } = useLocation();
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    dispatch({
      type: 'user/PASSWORD_RESET',
      payload: { password: values.password, query: search },
    });
  }

  return (
    <div>
      <Stack tokens={stackToken} horizontalAlign="center">
        <Logo width={150} isMobileView={false}></Logo>
        <Text variant='xLarge'>
          Reset Password
       </Text>
      </Stack>
      <Form
        name="password_reset1"
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
        <Form.Item>
          <Button type="primary" style={{ borderRadius: '14px' }} size="large" htmlType="submit" loading={loading} block>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
      <Stack horizontalAlign="center" styles={{ root: { paddingTop: '1rem' } }}>
        <Text variant={'large'}>
          Already have an account?
            <Link to="/auth/login">&nbsp; Sign In</Link>{' '}
        </Text>
      </Stack>
    </div>
  );
};