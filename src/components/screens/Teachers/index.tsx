import React from 'react';
import { View } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { fontNames } from '../../../styles/typography';
import colors from '../../../utility/colors';
import RegularText from '../../common/RegularText';

const Teachers = () => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.white, justifyContent: "center", alignItems: "center" }} key={"teachersScreen"} >
            <RegularText style={{ fontSize: textScale(14), fontFamily: fontNames.FONT_FAMILY_BOLD }} >COMMING SOON...</RegularText>
        </View>
    )
}


export default Teachers;