import { IStackStyles, IImageProps, getTheme, IButtonStyles, mergeStyleSets, FontWeights } from '@fluentui/react'

import { Depths } from '../../styles';

const theme = getTheme();

export const style = mergeStyleSets({
  /* Invest. Impact. Earn. */
  investText: {
    position: 'absolute',
    top: '50%',
    left: '25%',
    transform: 'translate(-50%, -50%)',
    width: 'min-content',
    fontWeight: 600,
    fontSize: '64px',
    color: '#fff',
  },
  desktopView: {
    '@media (max-width: 768px)': {
      display: 'none'
    },
  },
  linkColor: {
    color: theme.palette.themeTertiary,
    fontWeight: FontWeights.semibold
  },
  authbutton: {
    borderRadius: '44px'
  },
  backPadding: {
    paddingLeft: '0.5rem'
  },
  lightText: {
    fontWeight: FontWeights.semilight
  }
});

export const stackStyles: IStackStyles = {
  root: {
    /* Rectangle 425 */
    height: '100vh',
    backgroundColor: theme.palette.white,
    boxShadow: '0px 0px 30px -18px rgba(0, 0, 0, 0.16)',
    '@media (max-width: 768px)': {
      display: 'none'
    },
  }
}

export const imageStyles: IStackStyles = {
  root: {
    width: '100%',
    height: '100%',
    backgroundSize: '100% 100%'
  }
}

export const displayBoxStyle: IStackStyles = {
  root: {
  /* Rectangle 423 */
    position: 'absolute',
    right: '5%',
    minWidth: 300,
    width: '50%',
    height: '100%',
    padding: '0 6rem',
    maxHeight: 800,
    top: '50%',
    transform: 'translate(0, -50%)',
    background: '#F4F8FB'
  }
}

export const backgroundImageProps: IImageProps = {
  src: '../../../assets/farm-crop-1240w.jpg',
  // width: 744,
  // height: 900,
  // imageFit: ImageFit.cover
}

export const primaryButtonStyle: IButtonStyles = {
  root: {
    boxShadow: Depths.depth4,
    borderRadius: '14px',
    padding: '1.2rem 0',
    width: '100%'
  }
}

export const defaultButtonStyle: IButtonStyles = {
  root: {
    boxShadow: Depths.depth4,
    borderRadius: '14px',
    padding: '1.2rem 0',
    width: '100%',
    borderColor: theme.palette.themeTertiary
  }
}

