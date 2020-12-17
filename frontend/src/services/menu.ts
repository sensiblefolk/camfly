import { IIconProps, FontSizes } from '@fluentui/react';

const setIconProps = (iconName: string): IIconProps => {
    const iconProps: IIconProps = {
        iconName,
        style: {
            color: 'black',
            fontSize: FontSizes.large,
            padding: '0 0.5rem',
        },
    };
    return iconProps;
};

export type IMenu = {
    name: string;
    url: string;
    key: string;
    iconProps: IIconProps;
};

export const menus: IMenu[] = [
    {
        name: 'Home',
        url: '/',
        key: 'dash1',
        iconProps: setIconProps('WebComponents'),
    },
    {
        name: 'Campaign',
        url: '/campaign',
        key: 'camp',
        iconProps: setIconProps('SuitCase'),
    },
];
