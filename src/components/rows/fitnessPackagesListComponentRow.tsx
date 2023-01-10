import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import commonStyle from '../../styles/commonStyle';
import { boxShadow } from '../../styles/Mixins';
import { moderateScale, moderateScaleVertical, textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';
import { APP_PADDING_HORIZONTAL, PROGRAM_LEVEL } from '../../utility/constants';
import RegularText from '../common/RegularText';
import PTAndGroupComponent from '../modules/PTAndGroupComponent';

const image = 'https://economictimes.indiatimes.com/thumb/msid-85206159,width-1200,height-900,resizemode-4,imgsize-81692/fitness.jpg?from=mdr'


interface FitnessPackagesListComponentRowProps {
    item: Record<string, any>,
    index?: any,
    onPressProgram: (item: object, index: number) => void | undefined
    price: number
    isLoading?: boolean
}

const FitnessPackagesListComponentRow = ({ item, index, onPressProgram, price, isLoading }: FitnessPackagesListComponentRowProps) => {
    return (
        <>
            {
                isLoading ?
                    <SkeletonPlaceholder >
                        <View>
                            <View style={{ marginTop: spacing.MARGIN_12 }} />
                            <View style={styles.skeletonView} />
                        </View>
                    </SkeletonPlaceholder>
                    :
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onPressProgram(item, index)}
                        style={[styles.mainContainer, index == 0 && { marginTop: spacing.MARGIN_12 }]} >
                        <View style={styles.topContainer} >
                            <Image
                                // source={getImage(item?.attributes?.intropicture, image)}
                                source={{ uri: image }}
                                style={styles.introPicture}
                            />
                            <View style={styles.topContainer_rightContainer} >
                                <RegularText style={styles.packageName} >{item?.attributes?.packagename}</RegularText>
                                <RegularText style={styles.description} numberOfLines={2} >{item?.attributes?.aboutpackage}</RegularText>
                                <View style={styles.tagAndCreatedByContainer} >
                                    <View style={styles.tagContainer} >
                                        <RegularText style={styles.tagText} >{item?.attributes?.tags}</RegularText>
                                    </View>
                                    <View style={styles.createdByContainer} >
                                        <RegularText style={styles.createdByText} >created by arjun nair</RegularText>
                                        <Image
                                            source={{ uri: image }}
                                            style={styles.profilePic}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.seprator} />
                        <View style={styles.bottomContainer} >
                            <View style={[commonStyle.flexRow, { flex: 1 }]} >
                                {
                                    item?.attributes?.ptoffline && item?.attributes?.ptoffline > 0 ?
                                        <PTAndGroupComponent title={`${item?.attributes?.ptoffline} PT`} /> : <></>
                                }
                                {
                                    item?.attributes?.ptonline && item?.attributes?.ptonline > 0 ?
                                        <PTAndGroupComponent title={`${item?.attributes?.ptonline} PT`} isOnline /> : <></>
                                }
                                {
                                    item?.attributes?.groupoffline && item?.attributes?.groupoffline > 0 ?
                                        <PTAndGroupComponent title={`${item?.attributes?.groupoffline} Group`} /> : <></>
                                }
                                {
                                    item?.attributes?.grouponline && item?.attributes?.grouponline > 0 ?
                                        <PTAndGroupComponent title={`${item?.attributes?.grouponline} Group`} isOnline /> : <></>
                                }
                                {
                                    item?.attributes?.recordedclasses && item?.attributes?.recordedclasses > 0 ?
                                        <PTAndGroupComponent title={`${item?.attributes?.recordedclasses} Recorded`} isOnline /> : <></>
                                }
                            </View>
                            <View style={styles.priceContainer} >
                                <RegularText style={styles.priceText} >${price}</RegularText>
                                <RegularText style={styles.perMonthText} >per month</RegularText>
                            </View>
                        </View>
                        <View style={[styles.levelContainer, {
                            backgroundColor: PROGRAM_LEVEL.BEGINNER == item?.attributes?.level ? colors.blue500 :
                                PROGRAM_LEVEL.INTERMEDIATE == item?.attributes?.level ? colors.amber600 :
                                    PROGRAM_LEVEL.ADVANCED == item?.attributes?.level ? colors.red400 : ''
                        }]} >
                            <RegularText style={styles.levelText} >{item?.attributes?.level}</RegularText>
                        </View>
                    </TouchableOpacity>
            }
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: spacing.RADIUS_12,
        padding: spacing.PADDING_8,
        backgroundColor: colors.white,
        marginBottom: spacing.MARGIN_12,
        marginHorizontal: APP_PADDING_HORIZONTAL,

        ...boxShadow()
    },
    topContainer: {
        ...commonStyle.flexRow
    },
    topContainer_rightContainer: {
        flex: 1,
        marginLeft: spacing.MARGIN_12
    },
    introPicture: {
        width: spacing.WIDTH_70,
        height: spacing.WIDTH_80,
        borderRadius: spacing.RADIUS_8
    },
    packageName: {
        fontSize: textScale(13),
    },
    description: {
        fontSize: textScale(11),
        color: colors.grey600,
        lineHeight: spacing.HEIGHT_20,
        marginTop: spacing.MARGIN_4,
        marginRight: spacing.MARGIN_40
    },
    tagAndCreatedByContainer: {
        ...commonStyle.flexRow,
        justifyContent: "space-between",
        marginTop: spacing.MARGIN_8
    },
    tagContainer: {
        paddingHorizontal: spacing.PADDING_8,
        backgroundColor: colors.amber100,
        borderRadius: spacing.RADIUS_90
    },
    tagText: {
        fontSize: textScale(11),
        marginTop: -spacing.WIDTH_1
    },
    createdByContainer: {
        ...commonStyle.flexRow,
    },
    createdByText: {
        width: spacing.WIDTH_50,
        textTransform: "capitalize",
        fontSize: textScale(8),
        color: colors.grey400
    },
    profilePic: {
        width: spacing.WIDTH_30,
        height: spacing.WIDTH_30,
        borderRadius: spacing.RADIUS_90
    },
    seprator: {
        borderTopColor: colors.grey300,
        borderTopWidth: 2,
        borderStyle: 'dashed',
        marginVertical: spacing.MARGIN_4
    },
    bottomContainer: {
        flexDirection: "row",
    },
    priceContainer: {
        justifyContent: "center",
        alignItems: "flex-end"
    },
    priceText: {
        fontSize: textScale(14),
        color: colors.green200
    },
    perMonthText: {
        color: colors.grey500,
        fontSize: textScale(8),
    },
    levelContainer: {
        position: "absolute",
        right: 0,
        paddingVertical: spacing.PADDING_4,
        borderTopRightRadius: spacing.RADIUS_12,
        borderBottomLeftRadius: spacing.RADIUS_12,
        minWidth: spacing.WIDTH_90,
        alignItems: "center"
    },
    levelText: {
        fontSize: textScale(10),
        color: colors.white,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        lineHeight: moderateScale(14)
    },
    skeletonView: {
        width: spacing.FULL_WIDTH - (APP_PADDING_HORIZONTAL * 2),
        height: spacing.HEIGHT_180,
        borderRadius: spacing.RADIUS_12,
        marginBottom: spacing.MARGIN_12,
        marginHorizontal: APP_PADDING_HORIZONTAL,
    },
})


FitnessPackagesListComponentRow.defaultProps = {
    onPressProgram: () => { },
    index: 0
}


export default FitnessPackagesListComponentRow;