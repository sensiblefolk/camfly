import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Stack, IconButton } from '@fluentui/react';
import { fabric } from 'fabric';

import { editCardStyle } from '../../style';
import AddImage from '../../../Utility/AddImage';
import { PayWithPaystack } from '../../../Utility/PayWithPayStack';
import { Logo } from '../../../NavBar/Logo';
import { RootSettingState } from '../../../../typings';

type Props = {
    addImageToCanvas: Function;
    selectedObjects: fabric.Object[];
    deleteSelected: Function;
    onSave?: Function;
    showDownload?: boolean;
    renderButton?: ReactNode;
};

const settingsSelector = (state: RootSettingState) => state.settings;

export const CampaignHeader = ({
    addImageToCanvas,
    selectedObjects,
    deleteSelected,
    onSave,
    renderButton,
    showDownload = false,
}: Props) => {
    const { isMobileView } = useSelector(settingsSelector);
    return (
        <Stack tokens={{ childrenGap: 10 }} styles={editCardStyle} horizontal verticalAlign="center">
            <Logo width={140} height={50} isMobileView={isMobileView} />
            <AddImage addImage={addImageToCanvas} />
            {selectedObjects?.length > 0 && (
                <IconButton
                    iconProps={{ iconName: 'Delete', style: { color: 'red', fontSize: '20px' } }}
                    onClick={() => deleteSelected()}
                />
            )}
            {!showDownload ? <PayWithPaystack amount={9000} callback={onSave as Function} /> : <>{renderButton}</>}
        </Stack>
    );
};
