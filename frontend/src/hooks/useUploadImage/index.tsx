import { useState } from 'react';

interface IUploadImageProps {
    status: boolean;
    imageUrl: string;
    uploadImage: (imageData: string, fileType: string) => void;
}

export const useUploadImage = (): IUploadImageProps => {
    const [status, setStatus] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');

    const uploadImage = (imageData: string, fileType: string) => {
        const url = process.env.REACT_APP_UPLOAD_IMAGE_URL as string;
        setStatus(true);
        try {
            (async () => {
                const r = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        base64ImageString: imageData,
                        fileType: fileType,
                    }),
                });
                const result = await r.json();

                if (result.status === 'done') {
                    // console.log('api result', result);
                    setImageUrl(result?.imageUrl);
                    setStatus(false);
                }
            })();
        } catch (_err) {
            setStatus(false);
        }
    };

    return { status, imageUrl, uploadImage };
};
