import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Stack, Text, IStackTokens, ActionButton } from '@fluentui/react';
import { Skeleton } from 'antd';

import { styles, newCamPaignButton, addIconStyle } from '../style';
import { CompletedCampaign } from './CompletedCampaign';
import { HOME } from './graphql';
import { IHome, ICampaign } from './typings';

const campaignToken: IStackTokens = { childrenGap: 20 };

export const Home = () => {
    const history = useHistory();

    // HOME query definition
    const { data, loading, error } = useQuery<IHome>(HOME);

    const campaign = data?.campaign;

    return (
        <Stack
            style={{ padding: '3rem 0', margin: '0 auto' }}
            tokens={{ childrenGap: 50, maxWidth: 700 }}
            horizontalAlign="center"
        >
            <Skeleton loading={loading || !!error} paragraph={{ rows: 4 }} active>
                <Text variant="large">Create new campaigns on the fly</Text>
                <Stack tokens={campaignToken} horizontalAlign="center">
                    <Text variant="medium" className={styles.semiBold}>
                        Create new campaign
                    </Text>
                    <ActionButton
                        styles={newCamPaignButton}
                        iconProps={{ iconName: 'Add', style: addIconStyle }}
                        onClick={() => history.push('/campaign')}
                    />
                </Stack>
                <CompletedCampaign campaigns={campaign as ICampaign[]} />
            </Skeleton>
        </Stack>
    );
};
