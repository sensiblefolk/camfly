import { INavStyles, FontSizes, getTheme, IStackStyles } from '@fluentui/react';

import { Depths } from '../../../styles';

const theme = getTheme();

export const navStyles: Partial<INavStyles> = {
    linkText: {
        fontSize: FontSizes.mediumPlus,
    },
};

export const menuStackStyles: IStackStyles = {
    root: {
        width: 248,
        backgroundColor: theme.palette.white,
        boxShadow: Depths.depth4,
        // height: '100%',
        // position: 'fixed',
        zIndex: 1,
        height: '100vh',
        top: 0,
        left: 0,
    },
};
