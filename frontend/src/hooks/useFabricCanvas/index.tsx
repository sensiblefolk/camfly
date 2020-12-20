import { useState, useEffect } from 'react';
import { fabric } from 'fabric';

import { imageFilterResize, loadImageIntoCanvas } from '../utility';

let defaultWidth = window.outerWidth * 0.9 < 1280 ? window.outerWidth * 0.9 : 1200;
let defaultHeight = window.outerHeight * 0.7 > defaultWidth ? defaultWidth : window.outerHeight * 0.7;

const initializeCanvas = (width?: number, height?: number) => {
    fabric.Object.prototype.transparentCorners = true;
    fabric.Object.prototype.cornerColor = 'blue';
    fabric.Object.prototype.cornerStyle = 'circle';

    return new fabric.Canvas('canvas', {
        width: width || defaultWidth,
        height: height || defaultHeight,
    });
};

type ICanvasProps = {
    canvas: fabric.Canvas;
    addImageToCanvas: Function;
    loadImageIntoCanvas: Function;
};

export const useFabricCanvas = (): ICanvasProps => {
    const [canvas, setCanvas] = useState<fabric.Canvas>(initializeCanvas());

    useEffect(() => {
        setCanvas(initializeCanvas());
    }, []);

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

    return { canvas, addImageToCanvas, loadImageIntoCanvas };
};
