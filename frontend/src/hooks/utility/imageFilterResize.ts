import { fabric } from 'fabric';

// apply fabric.js filter resize algorithm to remove noise in image control
const imageFilterResize = (canvas: fabric.Canvas, img: fabric.Image) => {
    const canvasHeight = canvas.getHeight();
    const canvasWidth = canvas.getWidth();
    const imageHeight = img.height as number;
    const imageWidth = img.width as number;

    const scale = canvasHeight / imageHeight;

    img.filters?.push(
        new fabric.Image.filters.Resize({
            resizeType: 'sliceHack',
            scaleX: scale,
            scaleY: scale,
        }),
    );
    
    imageWidth > canvasWidth && img.scaleToWidth(canvas.getWidth());

    img.applyFilters();
};

export default imageFilterResize;
