import React from 'react';
import { Stack, IStackTokens } from '@fluentui/react';
import { Button } from 'antd';

import { useFabricCanvas, useUploadImage } from '../../../../hooks';
import AddImage from '../../../Utility/AddImage';


type Props = {
    id: string;
    title: string;
};

const stackTokens: IStackTokens = { childrenGap: 14 };

export const NewCampaign = ({ id, title }: Props) => {
    const { canvas, addImageToCanvas } = useFabricCanvas();
    const { status, imageUrl, uploadImage } = useUploadImage();

    // save canvas data on save button click
    const onSave = (width: number, height: number) => {
        const canvasData = canvas.toJSON();
        console.log('canvas data', canvasData);
        const img = canvas.toDataURL({
            format: 'png',
            quality: 0.9,
            width,
            height,
            enableRetinaScaling: true,
        });
        uploadImage(img, 'image/png');
    };

    console.log('image data out', imageUrl, status);

    return (
        <Stack tokens={stackTokens} horizontalAlign="stretch">
            <p>{title}</p>
            <Stack.Item align="center">
                <Stack>
                    <Stack tokens={{ childrenGap: 10 }} horizontal verticalAlign="center">
                        <AddImage addImage={addImageToCanvas} />
                        <Button
                            size="middle"
                            type="primary"
                            shape="round"
                            onClick={() => onSave(canvas.width as number, canvas.height as number)}
                        >
                            save
                        </Button>
                    </Stack>
                    <canvas className="canvas-border" id="canvas"></canvas>
                </Stack>
            </Stack.Item>
        </Stack>
    );
};
