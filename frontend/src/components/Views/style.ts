import { IStackStyles, getTheme, mergeStyleSets, FontWeights, IButtonStyles } from '@fluentui/react';

import { Card, Depths } from '../../styles';

const theme = getTheme();

export const cardStyle: IStackStyles = {
    root: {
        ...Card,
        borderRadius: '7px',
    },
};

export const editCardStyle: IStackStyles = {
    root: {
        ...Card,
        borderRadius: '18px',
        boxShadow: Depths.depth8,
        paddingRight: '20px',
        margin: '1rem 0',
        width: 'max-content',
    },
};

export const cardStyleHover: IStackStyles = {
    root: {
        ...Card,
        borderRadius: '7px',
        minWidth: 320,
        ':hover': {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);',
        },
    },
};

export const styles = mergeStyleSets({
    lightText: {
        // fontWeight: FontWeights.semilight
        color: '#737475',
    },
    errotText: {
        color: theme.palette.red,
    },
    highlightText: {
        backgroundColor: '#E5E5E5',
        mixBlendMode: 'multiply',
        fontWeight: FontWeights.semibold,
        borderRadius: '4px',
        padding: '0 0.2rem',
    },
    semiBold: {
        fontWeight: FontWeights.semibold,
    },
    bold: {
        fontWeight: FontWeights.bold,
    },
    whiteIcon: {
        color: theme.palette.white,
        paddingLeft: '0.3rem',
        paddingTop: '0.2rem',
        ':hover': {
            color: theme.palette.neutralLighter,
        },
    },
    depositTag: {
        backgroundColor: 'rgba(36, 174, 95, 0.2)',
        fontWeight: FontWeights.semilight,
        borderRadius: '5px',
        mixBlendMode: 'multiply',
        padding: '0 0.2rem',
    },
    pendingTag: {
        backgroundColor: 'rgba(189, 136, 23, 0.2)',
        fontWeight: FontWeights.semilight,
        borderRadius: '5px',
        mixBlendMode: 'multiply',
        padding: '0 0.2rem',
    },
    withdrawTag: {
        backgroundColor: 'rgba(241, 57, 57, 0.2)',
        fontWeight: FontWeights.semilight,
        borderRadius: '5px',
        mixBlendMode: 'multiply',
        padding: '0 0.2rem',
    },
});

export const newCamPaignButton: IButtonStyles = {
    root: {
        background: theme.palette.white,
        padding: '3rem 6rem',
        border: '1px solid',
        borderColor: theme.palette.blackTranslucent40,
        borderRadius: '4px',
    },
    rootHovered: {
        borderColor: theme.palette.black,
    },
};

export const addIconStyle: React.CSSProperties = {
    fontSize: '2rem',
    color: theme.palette.black,
};
