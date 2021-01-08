import React from 'react';
import { useQuery } from '@apollo/client';
import { Skeleton, message } from 'antd';

import { GET_CAMPAIGN } from '../../graphql';
import { ICampaignQuery, ICampaign } from '../../typings';
import { CampaignView } from './CampaignView';

type Props = {
    id: string;
};

export const CreatedCampaign = ({ id }: Props) => {
    // query error handler
    const onQueryError = (_error: any) => {
        message.error('It looks like you are offline, connect to the internet and try again');
    };

    // fetch campaign details from database
    const { data, loading, error } = useQuery<ICampaignQuery>(GET_CAMPAIGN, {
        variables: {
            id,
        },
        onError: onQueryError,
    });

    const campaign = data?.campaign_by_pk as Partial<ICampaign>;

    return (
        <Skeleton loading={loading || !!error} active round>
            <CampaignView campaign={campaign} />
        </Skeleton>
    );
};
