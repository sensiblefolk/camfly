import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Stack, IStackTokens } from '@fluentui/react';
import { Helmet } from 'react-helmet';
import { message } from 'antd';

import { CampaignHeader } from '../CampaignHeader';
import { ICampaign } from '../../typings';
import { useFabricCanvas } from '../../../../hooks';

const stackTokens: IStackTokens = { childrenGap: 14 };

type Props = {
    campaign: Partial<ICampaign>;
};

export const CampaignView = ({ campaign }: Props) => {
    const { canvas, addImageToCanvas, deleteSelected, selectedObjects, loadImageIntoCanvas } = useFabricCanvas(
        'campaign-canvas',
    );

    const title = campaign.name as string;

    async function fetchImageData(url: string): Promise<string | null> {
        try {
            const fetchResponse = await fetch(url, {
                method: 'GET',
            });
            const result = await fetchResponse.text();
            return result;
        } catch (_err) {
            message.error('You might not be connected to the internet');
            return null;
        }
    }

    useEffect(() => {
        async function getData(url: string) {
            const baseData = await fetchImageData(url);
            loadImageIntoCanvas(baseData as string, canvas);
        }

        if (campaign) {
            getData(campaign.image_url as string);
        }
    }, [campaign, canvas, loadImageIntoCanvas]);

    return (
        <>
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
                            <canvas className="canvas-border" id="campaign-canvas"></canvas>
                        </Stack.Item>
                    </Stack.Item>
                </Stack>
            ) : (
                <Redirect to="/auth/login" />
            )}
        </>
    );
};
