import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Stack, IStackTokens } from '@fluentui/react';
import { Helmet } from 'react-helmet';
import { message, Button } from 'antd';

import { CampaignHeader } from '../CampaignHeader';
import { ICampaign } from '../../typings';
import { INC_DOWNLOAD } from '../../graphql';
import { useFabricCanvas } from '../../../../hooks';

const stackTokens: IStackTokens = { childrenGap: 14 };

type Props = {
    campaign: Partial<ICampaign>;
};

export const CampaignView = ({ campaign }: Props) => {
    const { canvas, addImageToCanvas, deleteSelected, selectedObjects, loadImageIntoCanvas } = useFabricCanvas(
        'campaign-canvas',
    );

    // update download count mutation
    const [incrementDownloadCount, { error, loading }] = useMutation(INC_DOWNLOAD);

    if (error) console.error('failed updating download', error);

    const title = campaign?.name as string;

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

    const downloadData = async () => {
        const imgData = canvas.toDataURL({
            format: 'png',
            quality: 0.9,
            width: canvas.getWidth(),
            height: canvas.getHeight(),
            enableRetinaScaling: true,
        });
        await incrementDownloadCount({ variables: { id: campaign.id } });
        const anchorTag = document.createElement('a');
        anchorTag.href = imgData;
        anchorTag.setAttribute('download', title);
        anchorTag.click();
    };

    const DownloadButton = () => {
        return (
            <Button type="primary" size="middle" shape="round" loading={loading || !!error} onClick={downloadData}>
                Download
            </Button>
        );
    };

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
                            showDownload
                            renderButton={<DownloadButton />}
                        />
                        <Stack.Item>
                            <canvas className="canvas-border" id="campaign-canvas"></canvas>
                        </Stack.Item>
                    </Stack.Item>
                </Stack>
            ) : (
                // <Redirect to="/auth/login" />
                <div>nothing to show</div>
            )}
        </>
    );
};
