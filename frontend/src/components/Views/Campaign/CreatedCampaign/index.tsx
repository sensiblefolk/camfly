import React from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Stack, IStackTokens } from '@fluentui/react';
import { Skeleton } from 'antd';
import { Helmet } from 'react-helmet';

import { GET_CAMPAIGN } from '../../graphql';
import { ICampaignQuery } from '../../typings';
import { CampaignHeader } from '../CampaignHeader';
import { useFabricCanvas } from '../../../../hooks';

type Props = {
    id: string;
};

const stackTokens: IStackTokens = { childrenGap: 14 };

export const CreatedCampaign = ({ id }: Props) => {
    const { canvas, addImageToCanvas, deleteSelected, selectedObjects, loadImageIntoCanvas } = useFabricCanvas();

    // handle campaign query load success
    const onQueryComplete = (data: ICampaignQuery) => {
        const campaignData = data.campaign_by_pk;
        if (campaignData) {
            loadImageIntoCanvas();
        }
    };

    // fetch campaign details from database
    const { data, loading, error } = useQuery<ICampaignQuery>(GET_CAMPAIGN, {
        variables: {
            id,
        },
        onCompleted: onQueryComplete,
    });

    const campaign = data?.campaign_by_pk;
    const title = campaign?.name as string;

    return (
        <Skeleton loading={loading || !!error} active round paragraph={{ rows: 3 }}>
            {campaign ? (
                <Stack tokens={stackTokens} horizontalAlign="stretch">
                    <Stack.Item align="center">
                        <Helmet title={title} />
                        <h2>{title.split('')[0].toUpperCase() + title.slice(1)}</h2>
                    </Stack.Item>
                    <Stack.Item align="center">
                        <CampaignHeader
                            addImageToCanvas={addImageToCanvas}
                            selectedObjects={selectedObjects}
                            deleteSelected={deleteSelected}
                            onSave={() => null}
                        />
                        <Stack.Item>
                            <canvas className="canvas-border" id="canvas"></canvas>
                        </Stack.Item>
                    </Stack.Item>
                </Stack>
            ) : (
                <Redirect to="/auth/login" />
            )}
        </Skeleton>
    );
};

async function fetchImageData(url: string): Promise<string | null> {
    try {
        const fetchResponse = await fetch(url, {
            method: 'GET',
        });
        const result = await fetchResponse.text();
        console.log('result', result);
        return result;
    } catch (err) {
        console.error('failed reading image data', err);
        return null;
    }
}
