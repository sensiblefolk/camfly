import React from 'react';
import { useHistory } from 'react-router-dom';
import { Stack, IStackTokens, Text } from '@fluentui/react';
import { Form, Button, Input } from 'antd';

const stackTokens: IStackTokens = { childrenGap: 20, maxWidth: '500px', maxHeight: '700px' };

export const Campaign = () => {
    const history = useHistory();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
        history.push(`/campaign/1/${values?.title}`);
    };

    return (
        <Stack
            tokens={stackTokens}
            style={{ height: '100vh', margin: '0 auto' }}
            verticalAlign="center"
            horizontalAlign="stretch"
        >
            <Text variant="xxLarge">create a new campaign</Text>
            <Form
                name="creat-campaign"
                form={form}
                onFinish={onFinish}
                layout="vertical"
                hideRequiredMark
                scrollToFirstError
                style={{ paddingTop: '2rem' }}
            >
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Enter a campaign title',
                        },
                    ]}
                    name="title"
                >
                    <Input size="large" required />
                </Form.Item>
                <Form.Item>
                    <Button style={{ width: '100%' }} type="primary" size="large" htmlType="submit">
                        Create Campaign
                    </Button>
                </Form.Item>
            </Form>
        </Stack>
    );
};
