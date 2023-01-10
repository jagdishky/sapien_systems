import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import commonStyle from '../../styles/commonStyle';
import { boxShadow } from '../../styles/Mixins';
import { moderateScale, textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import { Colors } from '../../utility';
import colors from '../../utility/colors';
import { APP_PADDING_HORIZONTAL } from '../../utility/constants';
import { Images } from '../../utility/imagePaths';
import RegularText from '../common/RegularText';

const image = 'https://economictimes.indiatimes.com/thumb/msid-85206159,width-1200,height-900,resizemode-4,imgsize-81692/fitness.jpg?from=mdr'


interface CategoryListComponentRowProps {
    item: any,
    index: number,
    selectedCategory: number,
    onPressCategory: (item: object, index: number) => void
}

const CategoryListComponentRow = ({ item, index, selectedCategory, onPressCategory }: CategoryListComponentRowProps) => {
    return (
        <TouchableOpacity
            onPress={() => onPressCategory(item, index)}
            style={[styles.mainContainer, index == 0 && { marginLeft: APP_PADDING_HORIZONTAL }]} >
            <View style={[styles.iconStyle, selectedCategory == index && { backgroundColor: colors.grey900 }]} >

            </View>
            <RegularText style={[styles.categoryName, selectedCategory == index && { color: colors.grey900 }]} >{"Yoga"}</RegularText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginVertical: spacing.MARGIN_20,
        marginRight: spacing.MARGIN_12,
        alignItems: 'center',
    },
    iconStyle: {
        width: spacing.WIDTH_60,
        height: spacing.WIDTH_60,
        borderRadius: spacing.RADIUS_90,
        backgroundColor: colors.grey400
    },
    categoryName: {
        fontSize: textScale(13),
        color: colors.grey500,
    },
})


export default CategoryListComponentRow;