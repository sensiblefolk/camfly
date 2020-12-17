import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
    ActionButton,
    FontIcon,
    IIconStyles,
    Nav,
    INavLink,
    Panel,
    PanelType,
    IPanelProps,
    IRenderFunction,
} from '@fluentui/react';

import { menus } from '../../../../services/menu';
import { navStyles } from '../styles';

const iconStyles: IIconStyles = {
    root: {
        color: 'black',
    },
};

export const LeftMenu = () => {
    const history = useHistory();
    const currentLocation = history?.location?.pathname;
    const [isOpen, setIsOpen] = React.useState(false);

    // set current link location on load
    const initialLocation = (location: string): string => {
        const currentLocation = menus.find((menu) => menu.url === location);
        // navLinkClick(currentLocation?.key);
        return currentLocation?.key as string;
    };

    const [isKey, setIsKey] = React.useState<string | undefined>(initialLocation(currentLocation));
    const openPanel = useCallback(() => setIsOpen(true), []);
    const dismissPanel = useCallback(() => setIsOpen(false), []);
    const navLinkClick = useCallback((key) => setIsKey(key), []);

    // navLink function callback
    const _onLinkClick = (ev: React.MouseEvent<HTMLElement, MouseEvent> | undefined, item?: INavLink | undefined) => {
        ev?.preventDefault();
        if (item && item.url !== currentLocation) {
            // setIsKey(item.key);
            navLinkClick(item.key);
            history.push(item.url);
            dismissPanel();
        }
    };

    const onRenderNavigationContent: IRenderFunction<IPanelProps> = useCallback(
        (props: any, defaultRender: any) => (
            <>
                {
                    // This custom navigation still renders the close button (defaultRender).
                    // If you don't use defaultRender, be sure to provide some other way to close the panel.
                    defaultRender!(props)
                }
            </>
        ),
        [],
    );

    return (
        <>
            <ActionButton styles={iconStyles} title="menu" ariaLabel="menu" onClick={openPanel}>
                <FontIcon style={{ fontSize: '1.1rem' }} iconName="GlobalNavButton" />
            </ActionButton>
            <Panel
                isLightDismiss
                isOpen={isOpen}
                type={PanelType.smallFixedNear}
                onDismiss={dismissPanel}
                onRenderNavigationContent={onRenderNavigationContent}
                closeButtonAriaLabel="Close"
            >
                <Nav
                    onLinkClick={_onLinkClick}
                    selectedKey={isKey}
                    selectedAriaLabel="Selected"
                    ariaLabel="mobile menu"
                    styles={navStyles}
                    groups={[
                        {
                            links: [...menus],
                        },
                    ]}
                />
            </Panel>
        </>
    );
};
