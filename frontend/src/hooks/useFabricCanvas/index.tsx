import { useState, useEffect } from 'react';
import { fabric } from 'fabric';

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

export const useFabricCanvas = (): { canvas: fabric.Canvas } => {
    const [canvas, setCanvas] = useState<fabric.Canvas>(initializeCanvas());

    useEffect(() => {
        setCanvas(initializeCanvas());
    }, []);

    return { canvas };
};
