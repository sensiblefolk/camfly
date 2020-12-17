import React from 'react';
import { Image, IImageProps, ImageFit, Link } from '@fluentui/react';

interface LogoProps {
    isMobileView: boolean;
    width?: number;
    height?: number;
    [propsName: string]: any;
}

export const Logo = (props: LogoProps) => {
    const { isMobileView = false, width = 220, height = 83 } = props;

    const src = !isMobileView ? '../../../../assets/logo.png' : './assets/logo-mobile.png';
    const imgWidth = !isMobileView ? width : 122;
    const imgHeight = !isMobileView ? height : 38;

    const logoProps: IImageProps = {
        src,
        imageFit: ImageFit.contain,
        width: imgWidth,
        height: imgHeight,
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return (
        <>
            <Link href="/">
                <Image {...(logoProps as any)} alt="camfly logo" />
            </Link>
        </>
    );
};
