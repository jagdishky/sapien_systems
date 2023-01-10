import React from "react";
import { View, StyleSheet, Image, ImageProps } from 'react-native'
import { moderateScale } from "react-native-size-matters";
import { textScale } from "../../styles/responsiveStyles";
import { spacing } from "../../styles/spacing";
import colors from "../../utility/colors";
import RegularText from "../common/RegularText";

interface equipmentComponentRow {
    item: Record<string, any>
    removeMarginRight?: boolean
}

const EquipmentComponentRow = ({ item, removeMarginRight }: equipmentComponentRow) => {
    return (
        <View style={[styles.renderEquimentMainContainer, !removeMarginRight && { marginRight: spacing.MARGIN_20 }]} >
            <Image source={item?.image} style={styles.equipmentIconStyle} />
            <RegularText style={styles.equipmentTitle} >{item?.name}</RegularText>
        </View>
    )
}

const styles = StyleSheet.create({
    renderEquimentMainContainer: {
        alignItems: 'center',
        paddingHorizontal: spacing.PADDING_4
    },
    equipmentIconStyle: {
        width: spacing.WIDTH_30,
        height: spacing.WIDTH_30,
        tintColor: colors.grey400,
    },
    equipmentTitle: {
        fontSize: textScale(10),
        color: colors.grey400
    },
})

export default EquipmentComponentRow