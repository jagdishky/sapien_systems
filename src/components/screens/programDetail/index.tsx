import { useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View, TouchableOpacity, ScrollView, ViewStyle, ActivityIndicator } from 'react-native';
import { GET_FITNESS_PACKAGE_DETAIL } from '../../../graphql/fitnessPackage/queries';
import { GQL_TYPE_FITNESS_PACKAGE } from '../../../graphql/types';
import commonStyle from '../../../styles/commonStyle';
import { moderateScale, textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import colors from '../../../utility/colors';
import { APP_PADDING_HORIZONTAL } from '../../../utility/constants';
import { Images } from '../../../utility/imagePaths';
import CommonHeader from '../../common/CommonHeader';
import RegularText from '../../common/RegularText';
import CommonVideoPlayer from '../../common/View/CommonVideoPlayer';
import EquipmentComponent from '../../modules/EquipmentComponent';
import PTAndGroupComponent from '../../modules/PTAndGroupComponent';
import RenderHeading from '../../modules/RenderHeading';
import FitnessPackagesListComponentRow from '../../rows/fitnessPackagesListComponentRow';

interface programDetailScreenProps {
    route: Record<string, any>
}
interface renderQuickInformationProps {
    title: string
    information: string
    backgroundColor: string
    titleColor: string
}
interface renderPeriodProps {
    onPressPeriod: (item: Record<string, string | number>) => void,
    selectedPeriod: Record<string, any>
    data: Array<any>
}

interface renderHeadingProps {
    heading: string
}
interface renderEquipemt {
    icon: any,
    title: string
    removeMarginRight?: boolean
}
interface renderWorkingProcessProps {
    text: string
    isLastProcess?: boolean
    mainViewStyle?: ViewStyle
}
interface onPressPeriodProps {
    label: string
    value: number
}

function RenderQuickInformation({ title, information, backgroundColor, titleColor }: renderQuickInformationProps) {
    return (
        <View style={[styles.quickInformationContainer, { backgroundColor: backgroundColor }]} >
            <RegularText style={[styles.quickInformationContainer_text, { color: titleColor, fontSize: textScale(11) }]}  >{title}</RegularText>
            <RegularText style={styles.quickInformationContainer_text} >{information}</RegularText>
        </View>
    )
}

function RenderPeriod({ onPressPeriod, selectedPeriod, data }: renderPeriodProps) {
    return (
        <View style={styles.renderPeriodMainContainer} >
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={[styles.renderPeriodRowMainContainer, selectedPeriod.value == item.value && { borderBottomWidth: spacing.WIDTH_2 }]} onPress={() => onPressPeriod(item)} >
                            <RegularText style={[styles.renderPeriodRowMainContainer_text, selectedPeriod.value == item.value && { color: colors.blue400 }]}>{item.label}</RegularText>
                        </TouchableOpacity>
                    )
                }}
                horizontal
            />
        </View>
    )
}

function RenderWorkingProcess({ text, isLastProcess, mainViewStyle }: renderWorkingProcessProps) {
    return (
        <View style={[styles.renderWorkingProcessMainContainer, mainViewStyle]} >
            <View style={styles.breakdownContainer} >
                <View style={styles.breakdownContainer_circle} />
                {!isLastProcess && <View style={styles.breakdownContainer_strip} />}
            </View>
            <RegularText style={[styles.workingProcessText, !isLastProcess && { marginBottom: spacing.MARGIN_20 }]} >{text}</RegularText>
        </View>
    )
}

const EquipmentData = [
    { name: 'Stove', image: Images.IMG_STOVE },
    { name: 'Pan', image: Images.IMG_PAN },
    { name: 'Knife', image: Images.IMG_KNIFE },
    { name: 'Pot', image: Images.IMG_POT },
]
const renderPeriodData = [
    { label: 'Monthly', value: 1 },
    { label: 'Quaterly', value: 3 },
    { label: 'Half Yearly', value: 6 },
    { label: 'Yearly', value: 12 },
]

const ProgramDetailScreen = ({ route }: programDetailScreenProps) => {

    const { params } = route
    const { id } = params
    const image = 'https://economictimes.indiatimes.com/thumb/msid-85206159,width-1200,height-900,resizemode-4,imgsize-81692/fitness.jpg?from=mdr'

    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState(renderPeriodData[3])

    const { loading: fitnessPackageDetailLoading, error: fitnessPackageDetailError, data: fitnessPackageDetailRes, refetch: refetchData } = useQuery(GET_FITNESS_PACKAGE_DETAIL, {
        variables: {
            id: id
        }
    })

    const addressRes = fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.address?.data?.attributes

    function onPressPlayVideo() {
        setIsVideoPlaying(!isVideoPlaying)
    }

    function onPressPeriod(item: any) {
        setSelectedPeriod(item)
    }

    return (
        <View style={styles.mainContainer} >
            <CommonHeader
                title={fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.packagename}
                titleStyle={{ fontSize: textScale(16) }}
            />
            {
                fitnessPackageDetailLoading ?
                    <ActivityIndicator size={40} color={colors.theme} style={{ marginTop: spacing.MARGIN_12 }} />
                    :
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View  >
                            <View style={styles.videoBackground} />
                            <View style={styles.videoPlayContainer} >
                                <CommonVideoPlayer
                                    source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                                    onPressPlayVideo={onPressPlayVideo}
                                    paused={!isVideoPlaying}
                                    repeat={true}
                                    mainViewStyle={styles.videoPlayerStyle}
                                />
                                <View style={styles.detailContainer} >
                                    <RenderQuickInformation title='Type' information='Body Weight' backgroundColor={colors.green50} titleColor={colors.blue200} />
                                    <RenderQuickInformation title='Level' information={fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.level} backgroundColor={colors.blue100} titleColor={colors.red200} />
                                    <RenderQuickInformation title='Intensity' information='difficult' backgroundColor={colors.red50} titleColor={colors.red200} />
                                    <RenderQuickInformation title='KCAL/day' information='1500' backgroundColor={colors.amber300} titleColor={colors.grey900} />
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: APP_PADDING_HORIZONTAL }} >

                            <View style={styles.PTandCreatedByContainer} >
                                <View style={[commonStyle.flexRow, { flex: 1 }]} >
                                    <View style={commonStyle.flexRow} >
                                        {
                                            fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.ptoffline && fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.ptoffline > 0 ?
                                                <PTAndGroupComponent title={`${fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.ptoffline} PT`} /> : <></>
                                        }
                                        {
                                            fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.ptonline && fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.ptonline > 0 ?
                                                <PTAndGroupComponent title={`${fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.ptonline} PT`} isOnline /> : <></>
                                        }
                                        {
                                            fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.groupoffline && fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.groupoffline > 0 ?
                                                <PTAndGroupComponent title={`${fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.groupoffline} Group`} /> : <></>
                                        }
                                        {
                                            fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.grouponline && fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.grouponline > 0 ?
                                                <PTAndGroupComponent title={`${fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.grouponline} Group`} isOnline /> : <></>
                                        }
                                        {
                                            fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.recordedclasses && fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.recordedclasses > 0 ?
                                                <PTAndGroupComponent title={`${fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.recordedclasses} Recorded`} isOnline /> : <></>
                                        }
                                    </View>
                                </View>
                                <View style={styles.createdByContainer} >
                                    <RegularText style={styles.createdByText} >created by arjun nair</RegularText>
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.profilePic}
                                    />
                                </View>
                            </View>
                            <View style={[commonStyle.flexRow, { marginBottom: spacing.MARGIN_8 }]} >
                                <Image source={Images.IMG_LOCATION_PIN} style={styles.locationPin} />
                                <RegularText style={styles.address} >1st Floor Madangopal street, Abhirampuram, chennai- 600018</RegularText>
                            </View>

                        </View>
                        <RenderPeriod
                            onPressPeriod={onPressPeriod}
                            selectedPeriod={selectedPeriod}
                            data={renderPeriodData}
                        />
                        <FitnessPackagesListComponentRow
                            item={fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data}
                            price={(fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.fitnesspackagepricing[0]?.mrp || 0) * selectedPeriod.value}
                        />
                        <View style={styles.secondaryContainer} >
                            <RenderHeading heading='ABOUT' />
                            <RegularText style={styles.description} >{fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.aboutpackage}</RegularText>
                            <RenderHeading heading='Equipments' />
                            {/* <View style={commonStyle.flexRow} >
                    <RenderEquipemt icon={Images.IMG_STOVE} title={'Stove'} />
                    <RenderEquipemt icon={Images.IMG_PAN} title={'Pan'} />
                    <RenderEquipemt icon={Images.IMG_KNIFE} title={'Knife'} />
                    <RenderEquipemt icon={Images.IMG_POT} title={'Pot'} />
                </View> */}

                            <EquipmentComponent data={EquipmentData} />
                            <RenderHeading heading='Benifit' />
                            <RegularText style={styles.description} >{fitnessPackageDetailRes?.[GQL_TYPE_FITNESS_PACKAGE]?.data?.attributes?.benefits}</RegularText>
                            <RenderHeading heading='How Does it work?' />
                            <RenderWorkingProcess text='Lorem ipsum dolor sit amet consectetur adipisicing elit.' mainViewStyle={{ marginTop: spacing.MARGIN_6 }} />
                            <RenderWorkingProcess text='Lorem ipsum dolor sit amet consectetur adipisicing elit.' />
                            <RenderWorkingProcess text='Lorem ipsum dolor sit amet consectetur adipisicing elit.' isLastProcess />
                            <RenderHeading heading='Muscle Groups' />
                            <Image
                                source={Images.IMG_MUSCLE}
                                style={styles.muscleImage}
                                resizeMode={'contain'}
                            />
                            <TouchableOpacity style={styles.subscribeButton} >
                                <RegularText style={styles.subscribeButton_text} >Subscribe</RegularText>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    videoBackground: {
        height: spacing.FULL_HEIGHT / 10,
        width: '100%',
        backgroundColor: colors.theme,
        position: 'absolute'
    },
    videoPlayContainer: {
        paddingHorizontal: APP_PADDING_HORIZONTAL
    },
    videoPlayerStyle: {

    },
    detailContainer: {
        flexDirection: 'row'
    },
    quickInformationContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.PADDING_12
    },
    quickInformationContainer_title: {
        fontSize: textScale(11),
        textTransform: 'uppercase',
    },
    quickInformationContainer_text: {
        fontSize: textScale(10),
        textTransform: 'uppercase',
        lineHeight: moderateScale(16)
    },
    PTandCreatedByContainer: {
        ...commonStyle.flexRow,
        marginVertical: spacing.MARGIN_8
    },
    createdByContainer: {
        ...commonStyle.flexRow,
    },
    createdByText: {
        width: spacing.WIDTH_68,
        textTransform: "capitalize",
        fontSize: textScale(8),
        color: colors.grey400
    },
    profilePic: {
        width: spacing.WIDTH_30,
        height: spacing.WIDTH_30,
        borderRadius: spacing.RADIUS_90
    },
    locationPin: {
        width: spacing.WIDTH_22,
        height: spacing.WIDTH_30,
    },
    address: {
        marginLeft: spacing.MARGIN_6,
        width: "70%",
        fontSize: textScale(9),
        color: colors.grey600
    },
    renderPeriodMainContainer: {
        borderBottomWidth: spacing.WIDTH_1
    },
    renderPeriodRowMainContainer: {
        width: spacing.FULL_WIDTH / 4,
        alignItems: "center",
        borderColor: colors.blue400,
        // borderWidth: 1,
        paddingVertical: spacing.PADDING_4
    },
    renderPeriodRowMainContainer_text: {
        fontFamily: fontNames.FONT_FAMILY_SEMI_BOLD
    },
    secondaryContainer: {
        paddingHorizontal: APP_PADDING_HORIZONTAL
    },

    description: {
        fontSize: textScale(12),
        paddingHorizontal: spacing.PADDING_4
    },
    // equipmentContainer:{},

    renderWorkingProcessMainContainer: {
        flexDirection: 'row',
    },
    breakdownContainer: {
        alignItems: 'center',
        marginRight: spacing.MARGIN_6
    },
    breakdownContainer_circle: {
        width: spacing.WIDTH_6,
        height: spacing.WIDTH_6,
        borderRadius: spacing.RADIUS_12,
        backgroundColor: colors.deepPurple300
    },
    breakdownContainer_strip: {
        flex: 1,
        width: spacing.WIDTH_4,
        backgroundColor: colors.deepPurple50
    },
    workingProcessText: {
        marginTop: -spacing.MARGIN_6,
    },
    muscleImage: {
        width: spacing.FULL_WIDTH,
        height: spacing.HEIGHT_216,
    },
    subscribeButton: {
        backgroundColor: colors.deepPurple300,
        paddingVertical: spacing.PADDING_10,
        marginVertical: spacing.MARGIN_12,
        alignItems: 'center',
        borderRadius: spacing.RADIUS_8
    },
    subscribeButton_text: {
        color: colors.white,
        fontSize: textScale(14)
    },
})

export default ProgramDetailScreen;