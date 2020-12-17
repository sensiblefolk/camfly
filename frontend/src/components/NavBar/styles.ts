import { IIconStyles, mergeStyleSets } from '@fluentui/react';

export const itemStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    paddingRight: '2.2rem',
};

export const ringerIconStyles: IIconStyles = {
    root: {
        color: 'black',
    },
};

export const styles = mergeStyleSets({
    active: {
        textDecoration: 'underline',
        color: '#a5673b',
    },
});
