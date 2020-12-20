import { fabric } from 'fabric';

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

export default imageFilterResize;
