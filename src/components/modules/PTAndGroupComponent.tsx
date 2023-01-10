import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { boxShadow } from "../../styles/Mixins";
import { textScale } from "../../styles/responsiveStyles";
import { spacing } from "../../styles/spacing";
import { fontNames } from "../../styles/typography";
import colors from "../../utility/colors";
import { Images } from "../../utility/imagePaths";
import RegularText from "../common/RegularText";

interface PTAndGroupComponentProps {
    title: string,
    isOnline?: boolean
}
const PTAndGroupComponent = ({ title, isOnline }: PTAndGroupComponentProps) => {
    return (
        <View style={styles.PTAndGroup_mainContainer} >
            <View style={styles.PTAndGroup_imageContainer} >
                <Image
                    source={Images.IMG_USERS}
                    style={styles.PTAndGroup_image}
                />
                <View style={[styles.PTAndGroup_indicator, { borderColor: isOnline ? colors.green400 : colors.red900 }]} >
                    <View style={[styles.PTAndGroup_indicator_innerCircle, { backgroundColor: isOnline ? colors.green400 : colors.red900 }]} />
                </View>
            </View>
            <RegularText style={styles.PTAndGroup_text} >{title}</RegularText>
        </View>
    )
}

const styles = StyleSheet.create({
    PTAndGroup_mainContainer: {
        alignItems: "center",
        marginRight: spacing.MARGIN_16,

    },
    PTAndGroup_imageContainer: {
        backgroundColor: colors.white,
        width: spacing.WIDTH_24,
        height: spacing.WIDTH_24,
        borderRadius: spacing.RADIUS_90,
        justifyContent: "center",
        alignItems: "center",
        ...boxShadow()
    },
    PTAndGroup_image: {
        width: spacing.WIDTH_12,
        height: spacing.WIDTH_12,
    },
    PTAndGroup_indicator: {
        width: spacing.WIDTH_8,
        height: spacing.WIDTH_8,
        borderRadius: spacing.RADIUS_90,
        borderWidth: spacing.WIDTH_1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        right: 0
    },
    PTAndGroup_indicator_innerCircle: {
        width: spacing.WIDTH_4,
        height: spacing.WIDTH_4,
        borderRadius: spacing.RADIUS_90
    },
    PTAndGroup_text: {
        color: colors.grey400,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        fontSize: textScale(7)
    },
})

export default PTAndGroupComponent