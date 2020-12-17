import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IconButton, IIconProps, Text } from 'office-ui-fabric-react';
import { RootRouterState } from '../../../typings';

// TS router state interface infers type (state: RootState)
const routeSelector = (state: RootRouterState) => state.router;

// icon button props
const backButtonIcon: IIconProps = { iconName: 'Back' };

export const GoBack = () => {
    const history = useHistory();
    const router = useSelector(routeSelector);
    let splitRoute = router?.location?.pathname.split('/');
    // let routeName = !splitRoute[1] ? 'Home' : splitRoute[1];
    return (
        <div>
            {splitRoute[1] && (
                <IconButton
                    iconProps={backButtonIcon}
                    title="Go back"
                    ariaLabel="Go back"
                    style={{ padding: '0 2rem' }}
                    onClick={() => history.back()}
                >
                    {' '}
                    <Text variant="medium"> Back</Text>{' '}
                </IconButton>
            )}
        </div>
    );
};
