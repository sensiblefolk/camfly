import React, { useState } from 'react';
import { FontIcon } from '@fluentui/react';
import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type Props = {
    addImage: Function;
};

const AddImage = ({ addImage }: Props) => {
    const [loading, setLoading] = useState(false);

    function beforeUpload(file: any) {
        const isJpgOrPng =
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg' ||
            file.type === 'image/svg+xml';
        if (!isJpgOrPng) {
            message.error('You can add upload JPG/PNG/SVG file!');
        }
        const isLt5mb = file.size / 1024 / 1024 < 5;
        if (!isLt5mb) {
            message.error('Image must be smaller than 5MB!');
        }
        return isJpgOrPng && isLt5mb;
    }

    const uploadFile = async (e: any) => {
        let file = e.target.files[0]; //read data from the blob objects(file)
        setLoading(true);
        if (file) {
            let reader = new FileReader(); //reads the binary data and encodes it as base64 data url
            reader.readAsDataURL(file); //reads it finish with either success or failure
            reader.onloadend = async () => {
                //reader.result is the result of the reading in base64 string
                if (beforeUpload(file)) {
                    addImage(reader.result);
                    setLoading(false);
                    // await sendImageData(reader.result, file);
                }
            };
        }
    };

    return (
        <>
            {loading ? (
                <LoadingOutlined />
            ) : (
                <div className="file-input">
                    <input type="file" id="file" accept=".jpg,.png,.svg" className="file" onChange={uploadFile} />
                    <label htmlFor="file">
                        <FontIcon iconName="Photo2Add" style={{ fontSize: '25px' }} />
                    </label>
                </div>
            )}
        </>
    );
};

export default AddImage;
