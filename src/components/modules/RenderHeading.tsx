import React from 'react'
import { StyleSheet, View } from 'react-native';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import colors from '../../utility/colors';
import RegularText from '../common/RegularText';

interface renderHeadingProps {
    heading: string
}

const RenderHeading = ({ heading }: renderHeadingProps) => {
    return (
        <View style={styles.mainContainer} >
            <View style={styles.titleContainer} >
                <RegularText style={styles.heading} >{heading}</RegularText>
            </View>
            <View style={styles.seprator} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.MARGIN_12
    },
    titleContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: spacing.PADDING_16,
        paddingVertical: spacing.PADDING_6,
        borderRadius: spacing.RADIUS_30,
        borderWidth: spacing.WIDTH_1,
        borderColor: colors.teal300
    },
    heading: {
        fontSize: textScale(12),
        color: colors.teal300,
        textTransform: 'uppercase'
    },
    seprator: {
        flex: 1,
        height: spacing.HEIGHT_2,
        borderBottomWidth: spacing.WIDTH_2,
        borderColor: colors.grey200,
        borderStyle: 'dashed',
    },
})

export default RenderHeading;