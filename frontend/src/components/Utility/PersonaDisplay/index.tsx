import React from 'react';
import { useSelector } from 'react-redux';
import {
    IPersonaSharedProps,
    Persona,
    PersonaSize,
    PersonaPresence,
    PersonaInitialsColor,
} from 'office-ui-fabric-react';
import { RootSettingState } from '../../../typings';

// Props declaration for personal display
interface Props {
    imageUrl?: string;
    text?: string;
    showText: boolean;
    showTextInMobile: boolean;
    desktopSize?: PersonaSize
    mobileSize?: PersonaSize
}

// const imageSize = {
//     small: Per
// }

// TS declaration for settings state
const settingSelector = (state: RootSettingState) => state.settings;

export const PersonaDisplay = ({ showTextInMobile, showText, text, imageUrl, desktopSize = PersonaSize.size40, mobileSize = PersonaSize.size32 }: Props) => {
    const settings = useSelector(settingSelector);
    const { isMobileView } = settings;
    let textDefinition: string | undefined = '';

    // run check to append text display in mobile view
    if (isMobileView && showTextInMobile) {
        textDefinition = showText ? text?.split(' ')[0] : '';
    } else if (isMobileView && !showTextInMobile) {
        textDefinition = '';
    } else {
        textDefinition = showText ? text?.split(' ')[0] : '';
    }

    const userProfilePersona: IPersonaSharedProps = {
        imageUrl: imageUrl || '',
        imageInitials: text?.slice(0, 2),
        size: !isMobileView ? desktopSize: mobileSize,
        initialsColor: PersonaInitialsColor.darkBlue,
        showInitialsUntilImageLoads: true,
    };

    return (
        <Persona
            text={textDefinition}
            {...userProfilePersona}
            presence={PersonaPresence.none}
            imageAlt={text || ''}
        />
    );
};
