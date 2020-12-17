import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Stack, IStackStyles, IStackTokens, Text } from '@fluentui/react';

import { UserMenu } from './UserMenu';
import { Logo } from './Logo';
import { LeftMenu } from './Menu/LeftMenu';
import { RootUserState, RootSettingState } from '../../typings';
import { styles } from './styles';
import { menus } from '../../services/menu';

// TS infers type: (state: RootState)
const userSelector = (state: RootUserState) => state.user;
const settingSelector = (state: RootSettingState) => state.settings;

// Tokens definition
const stackTokens: IStackTokens = { childrenGap: 4 };

const stackStyles: IStackStyles = {
    root: {
        minHeight: '3rem',
    },
};

export const NavBar = () => {
    const user = useSelector(userSelector);
    const settings = useSelector(settingSelector);
    // const dispatch = useDispatch();
    const { isMobileView } = settings;

    return (
        <Stack tokens={stackTokens}>
            <header>
                <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={stackStyles}>
                    <Stack.Item>
                        <Stack tokens={{ childrenGap: 5 }} horizontal>
                            {isMobileView && <LeftMenu />}
                            {!isMobileView && <>{<Logo width={140} height={50} isMobileView={false} />}</>}
                        </Stack>
                    </Stack.Item>
                    <Stack.Item>
                        <Stack tokens={{ childrenGap: 20 }} horizontal>
                            {!isMobileView &&
                                menus.map((menu) => (
                                    <NavLink key={menu.key} to={menu.url} activeClassName={styles.active}>
                                        <Text variant="mediumPlus">{menu.name}</Text>
                                    </NavLink>
                                ))}
                        </Stack>
                    </Stack.Item>
                    <Stack.Item>
                        <UserMenu user={user} />
                    </Stack.Item>
                </Stack>
            </header>
        </Stack>
    );
};
