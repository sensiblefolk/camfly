import { useState, useEffect } from 'react';
import { fabric } from 'fabric';

import { imageFilterResize, loadImageIntoCanvas } from '../utility';

let defaultWidth = window.outerWidth * 0.9 < 1280 ? window.outerWidth * 0.9 : 1200;
let defaultHeight = window.outerHeight * 0.7 > defaultWidth ? defaultWidth : window.outerHeight * 0.7;

const initializeCanvas = (canvasId: string, width?: number, height?: number) => {
    fabric.Object.prototype.transparentCorners = true;
    fabric.Object.prototype.cornerColor = 'blue';
    fabric.Object.prototype.cornerStyle = 'circle';

    return new fabric.Canvas(canvasId, {
        width: width || defaultWidth,
        height: height || defaultHeight,
    });
};

type ICanvasProps = {
    canvas: fabric.Canvas;
    addImageToCanvas: Function;
    loadImageIntoCanvas: (base64Data: string, canvas: fabric.Canvas) => any;
    selectedObjects: fabric.Object[];
    deleteSelected: Function;
};

export const useFabricCanvas = (canvasId: string = 'canvas'): ICanvasProps => {
    const [canvas, setCanvas] = useState<fabric.Canvas>(initializeCanvas(canvasId));
    const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([]);

    useEffect(() => {
        const bindEvents = (canvas: fabric.Canvas) => {
            canvas.on('selection:cleared', () => {
                setSelectedObject([]);
            });
            canvas.on('selection:created', (e: any) => {
                setSelectedObject(e.selected);
            });
            canvas.on('selection:updated', (e: any) => {
                setSelectedObject(e.selected);
            });
        };
        if (canvas) {
            bindEvents(canvas);
        }

        // return () => {
        //     canvas.dispose();
        // };
    }, [canvas]);

    useEffect(() => {
        setCanvas(initializeCanvas(canvasId));
    }, [canvasId]);

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

    // delete selected canvas object from canvas
    const deleteSelected = () => {
        canvas.getActiveObjects().forEach((object) => canvas.remove(object));
        canvas.discardActiveObject();
        canvas.renderAll();
    };

    return { canvas, addImageToCanvas, loadImageIntoCanvas, selectedObjects, deleteSelected };
};
