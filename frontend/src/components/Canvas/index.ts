import { fabric } from 'fabric';
import AddImage from './AddImage';

// apply fabric.js filter resize algorithm to remove noise in image control
const imageFilterResize = (canvas: fabric.Canvas, img: fabric.Image) => {
    const scale = canvas.getHeight() / (img.height as number);

    img.filters?.push(
        new fabric.Image.filters.Resize({
            resizeType: 'sliceHack',
            scaleX: scale,
            scaleY: scale,
        }),
    );
    img.scaleToWidth(canvas.getWidth());

    img.applyFilters();
};

// load image and set fabric background
const loadImageIntoCanvas = (blobData: string, canvas: fabric.Canvas) => {
    fabric.Image.fromURL(blobData, (img) => {
        const imgWidth = img.width as number;
        const imgHeight = img.height as number;
        const canvasWidth = canvas.width as number;
        const canvasHeight = canvas.height as number;
        const canvasScaleX = (canvas.width as number) / (img.width as number);
        const canvasScaleY = (canvas.height as number) / (img.height as number);

        if (canvasWidth <= imgWidth || canvasHeight <= imgHeight) {
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: canvasScaleX,
                scaleY: canvasScaleY,
            });
        } else {
            canvas.setWidth(imgWidth);
            canvas.setHeight(imgHeight);
            canvas.backgroundImage = img;
            canvas.renderAll();
        }
    });
};

export { fabric, AddImage, imageFilterResize, loadImageIntoCanvas };
