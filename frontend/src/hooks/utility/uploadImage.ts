import { message } from 'antd';

type Props = {
    imageData: string;
    fileType?: string;
    callback: (imageUrl: string) => void;
};

const uploadImage = ({ imageData, fileType, callback }: Props) => {
    const url = process.env.REACT_APP_UPLOAD_IMAGE_URL as string;
    try {
        (async () => {
            const r = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    base64ImageString: imageData,
                    // fileType: fileType,
                }),
            });
            const result = await r.json();

            if (result?.status === 'done') {
                callback(result.imageUrl);
            }
        })();
    } catch (_err) {
        message.error('something went wrong');
    }
};

export default uploadImage;
