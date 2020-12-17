import React from 'react';
import { useHistory } from 'react-router-dom';
import { Stack, Text, IStackTokens, ActionButton, DefaultButton } from '@fluentui/react';

import { styles, newCamPaignButton, addIconStyle } from '../style';

const campaignToken: IStackTokens = { childrenGap: 20 };

export const Home = () => {
    const history = useHistory();

    return (
        <Stack style={{ paddingTop: '4rem' }} tokens={{ childrenGap: 50 }}>
            <Text variant="large">Create new campaigns on the fly</Text>
            <Stack tokens={campaignToken} horizontalAlign="start">
                <Text variant="medium" className={styles.semiBold}>
                    create new campaign
                </Text>
                <ActionButton
                    styles={newCamPaignButton}
                    iconProps={{ iconName: 'Add', style: addIconStyle }}
                    onClick={() => history.push('/campaign')}
                />
            </Stack>
            <Stack tokens={campaignToken} horizontalAlign="start">
                <Text variant="medium" className={styles.semiBold}>
                    view completed campaigns
                </Text>
                <DefaultButton styles={newCamPaignButton} text="hotr" />
            </Stack>
        </Stack>
    );
};
