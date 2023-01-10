import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StatusBar, StyleSheet, View, TextStyle, TouchableOpacity } from 'react-native';
import commonStyle from '../../styles/commonStyle';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';
import { APP_PADDING_HORIZONTAL } from '../../utility/constants';
import { Images } from '../../utility/imagePaths';
import RegularText from './RegularText';

interface commonHeaderProps {
    title?: string
    titleStyle?: TextStyle
    onBack?: () => void
    hideBackIcon?: boolean
}

const CommonHeader = ({ title, titleStyle, onBack, hideBackIcon }: commonHeaderProps) => {
    const navigation = useNavigation();

    function onPressBackIcon() {
        if (onBack) {
            onBack()
        } else {
            navigation.goBack()
        }
    }
    return (
        <View style={styles.mainContainer} >
            <StatusBar backgroundColor={colors.theme} barStyle={'light-content'} />
            <View style={{ width: '100%' }} >
                {hideBackIcon == true ?
                    <></>
                    :
                    <TouchableOpacity onPress={() => onPressBackIcon()} style={styles.backArrowContainer}>
                        <Image
                            source={Images.IMG_ARROW}
                            resizeMode={'contain'}
                            style={styles.backArrowIcon}
                        />
                    </TouchableOpacity>
                }
            </View>
            <RegularText style={[styles.title, titleStyle]} >{title}</RegularText>
        </View>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.theme,
        padding: spacing.PADDING_18,
        ...commonStyle.flexRow,
        justifyContent: 'center'
    },
    backArrowContainer: {
        width: spacing.WIDTH_60,
        height: spacing.WIDTH_30,
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },
    backArrowIcon: {
        width: spacing.WIDTH_12,
        height: spacing.WIDTH_12,
        transform: [{ rotate: '180deg' }],
    },
    title: {
        flex: 1,
        color: colors.white,
        fontSize: textScale(13),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        textAlign: "center",
        position: 'absolute',
        alignSelf: 'center',
    },
    secondaryContainer: {
        backgroundColor: colors.theme,
        height: spacing.HEIGHT_90
    },
    background: {
        height: spacing.FULL_HEIGHT / 2,
        width: spacing.FULL_WIDTH,
        backgroundColor: colors.theme,
        position: 'absolute',
        zIndex: 999
    },
})

export default CommonHeader;