import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IconButton, IIconProps, IContextualMenuProps } from 'office-ui-fabric-react';
import { ContextualMenu, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { PersonaDisplay } from '../../Utility/PersonaDisplay';
import { UserState } from '../../../redux/user/types';

interface UserProps {
    user: UserState;
}

// Right hand side icon button
const userIcon: IIconProps = { iconName: 'Contact' };

export const UserMenu = (props: UserProps) => {
    const { user } = props;
    const dispatch = useDispatch();
    const linkRef = React.useRef(null);
    const history = useHistory();
    const [showContextualMenu, setShowContextualMenu] = React.useState(false);
    const onShowContextualMenu = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.preventDefault();
        setShowContextualMenu(true);
    }, []);
    const onHideContextualMenu = useCallback(() => setShowContextualMenu(false), []);

    // function to handle signOut and redirects to login page
    const handleSignOut = (e: any) => {
        e.preventDefault();
        dispatch({
            type: 'user/LOGOUT',
        });
    };

    // list of available app menu items
    const menuList: any[] = [
        // {
        //     key: 'account1',
        //     text: 'Account',
        //     iconProps: { iconName: 'Contact' },
        // },
        {
            key: 'settings1',
            text: 'Settings',
            iconProps: { iconName: 'Settings' },
            onClick: () => history.push('/settings'),
        },
        {
            key: 'power',
            text: 'Sign Out',
            iconProps: { iconName: 'PowerButton' },
            onClick: (e: any) => handleSignOut(e),
        },
    ];

    const menuItems: IContextualMenuItem[] = menuList;

    const menuProps: IContextualMenuProps = {
        items: [...menuList],
        directionalHintFixed: true,
    };

    // Search if user is authorized if authorized show display menu with
    // persona image else show menu without
    if (user.authorized) {
        return (
            <>
                <a ref={linkRef} href="/" onClick={onShowContextualMenu}>
                    <PersonaDisplay showTextInMobile={false} showText imageUrl={user?.avatar} text={user?.name} />
                </a>
                <ContextualMenu
                    items={menuItems}
                    hidden={!showContextualMenu}
                    target={linkRef}
                    onItemClick={onHideContextualMenu}
                    onDismiss={onHideContextualMenu}
                />
            </>
        );
    } else if (!user.authorized && !user.loading) {
        return (
            <>
                <IconButton
                    menuProps={menuProps}
                    iconProps={userIcon}
                    title="Contact"
                    ariaLabel="Contact"
                    // checked={checked}
                />
            </>
        );
    }

    return null;
};
