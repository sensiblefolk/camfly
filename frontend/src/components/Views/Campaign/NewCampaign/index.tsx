import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Stack, IStackTokens} from '@fluentui/react';
import { useBoolean } from '@uifabric/react-hooks';
import dayJs from 'dayjs';

import { useFabricCanvas, uploadImage } from '../../../../hooks';
import { CampaignDialog } from '../../../Utility/CampaignDialog';
import { NEW_CAMPAIGN } from '../graphql';
import { CampaignHeader } from '../CampaignHeader'

type Props = {
    id: string;
    title: string;
};

const stackTokens: IStackTokens = { childrenGap: 14 };

export const NewCampaign = ({ title }: Props) => {
    const history = useHistory();
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
    const [dialogStatus, setdialogStatus] = useState<boolean>(false);
    const [campaignId, setcampaignId] = useState('');;
    const { canvas, addImageToCanvas, deleteSelected, selectedObjects } = useFabricCanvas();

    const toggleDialog = (): void => {
        toggleHideDialog();
        history.push('/')
    }

    // handle add new campaign mutation completion
    const onMutationComplete = (campaign: any) => {
        setcampaignId(campaign?.inserted_campaign_one?.id);
    };

    // new campaign mutation declaration
    const [addCampaign, { loading, error }] = useMutation(NEW_CAMPAIGN, { onCompleted: onMutationComplete });

    // save canvas data as an image and upload to database for campaign
    const onSave = (width: number, height: number) => {
        toggleHideDialog();
        const canvasData = canvas.toJSON();
        console.log('canvas data', canvasData);
        const img = canvas.toDataURL({
            format: 'png',
            quality: 0.9,
            width,
            height,
            enableRetinaScaling: true,
        });
        setdialogStatus(true);
        uploadImage({ imageData: img, fileType: 'image/png', callback: storeInDatabase });
    };

    function storeInDatabase(imageUrl: string) {
        setdialogStatus(false);
        addCampaign({
            variables: {
                createdAt: dayJs().toISOString(),
                imageUrl,
                name: title,
            },
        });
    }

    return (
        <Stack tokens={stackTokens} horizontalAlign="stretch">
            <CampaignDialog
                loading={dialogStatus || loading || !!error}
                hideDialog={hideDialog}
                toggleHideDialog={toggleDialog}
                campaignId={campaignId}
                title={title}
            />
            <Stack.Item align="center">
                <h2>{title.split('')[0].toUpperCase() + title.slice(1)}</h2>
            </Stack.Item>
            <Stack.Item align="center">
                <CampaignHeader addImageToCanvas={addImageToCanvas} selectedObjects={selectedObjects} deleteSelected={deleteSelected} onSave={onSave} />
                <Stack.Item>
                    <canvas className="canvas-border" id="canvas"></canvas>
                </Stack.Item>
            </Stack.Item>
        </Stack>
    );
};;
