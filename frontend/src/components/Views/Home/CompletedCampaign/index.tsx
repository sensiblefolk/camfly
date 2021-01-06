import React from 'react';
import { Stack, IStackTokens, Text, DefaultButton } from '@fluentui/react';

import { styles, newCamPaignButton } from '../../style';
import { ICampaign } from '../../typings';

const campaignToken: IStackTokens = { childrenGap: 20 };

type Props = {
    campaigns: ICampaign[];
};

export const CompletedCampaign = ({ campaigns }: Props) => {
    return (
        <Stack tokens={campaignToken} horizontalAlign="center">
            <Text variant="medium" className={styles.semiBold}>
                Completed campaigns
            </Text>
            <Stack tokens={{ childrenGap: 10 }} horizontal horizontalAlign="space-around">
                {campaigns?.length > 0 &&
                    campaigns.map((campaign) => (
                        <DefaultButton key={campaign.id} styles={newCamPaignButton} text={campaign.name} />
                    ))}
            </Stack>
        </Stack>
    );
};
