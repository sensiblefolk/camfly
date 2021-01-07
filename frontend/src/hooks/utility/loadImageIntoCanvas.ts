import { fabric } from 'fabric';

// load image and set fabric background
const loadImageIntoCanvas = (blobData: string, canvas: fabric.Canvas) => {
    console.log('called once');
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

export default loadImageIntoCanvas;
