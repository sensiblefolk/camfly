import React, { useState } from 'react';
import { Stack, IStackTokens } from '@fluentui/react';

import { fabric, AddImage, imageFilterResize } from '../../../Canvas';
import { useFabricCanvas } from '../../../../hooks/useFabricCanvas';
import { Button } from 'antd';

type Props = {
    id: string;
    title: string;
};

const stackTokens: IStackTokens = { childrenGap: 14 };

export const NewCampaign = ({ id, title }: Props) => {
    const { canvas } = useFabricCanvas();
    const [image, setImage] = useState('');

    // add image to canvas
    const addImageToCanvas = (blobData: any) => {
        fabric.Image.fromURL(
            blobData,
            (img) => {
                imageFilterResize(canvas, img);
                canvas.add(img);
                canvas.centerObject(img);
                canvas.setActiveObject(img);
                canvas.renderAll();
            },
            { crossOrigin: 'Anonymous' },
        );
    };

    // save canvas data on save button click
    const onSave = (width: number, height: number) => {
        const data = canvas.toJSON();
        console.log('canvas data', data);
        const img = canvas.toDataURL({
            format: 'png',
            quality: 0.9,
            width,
            height,
            enableRetinaScaling: true,
        });
        console.log('img', img);
        setImage(img);
    };

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
                    <img src={image} alt="" />
                </Stack>
            </Stack.Item>
        </Stack>
    );
};
