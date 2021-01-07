import React from 'react';
import { useQuery } from '@apollo/client';
import { Skeleton } from 'antd';

import { GET_CAMPAIGN } from '../../graphql';
import { ICampaignQuery, ICampaign } from '../../typings';
import { CampaignView } from './CampaignView';

type Props = {
    id: string;
};

export const CreatedCampaign = ({ id }: Props) => {
    // fetch campaign details from database
    const { data, loading } = useQuery<ICampaignQuery>(GET_CAMPAIGN, {
        variables: {
            id,
        },
    });

    const campaign = data?.campaign_by_pk as Partial<ICampaign>;

    return (
        <Skeleton loading={loading} active round>
            <CampaignView campaign={campaign} />
        </Skeleton>
    );
};
