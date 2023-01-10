import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Video from 'react-native-video';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import colors from '../../../utility/colors';
import { Images } from '../../../utility/imagePaths';
import RegularText from '../RegularText';

interface videoPlayerProps {
    paused?: boolean
    repeat?: boolean
    onPressPlayVideo: () => void
    source?: any
    mainViewStyle?: ViewStyle
}

const HEIGHT = spacing.HEIGHT_192

const CommonVideoPlayer = ({ paused, repeat, onPressPlayVideo, source, mainViewStyle }: videoPlayerProps) => {
    const [isBuffering, setIsBuffering] = useState(false)
    function onBuffer() {
        setIsBuffering(!isBuffering)
    }
    function onError() {

    }
    return (
        <View style={[styles.mainView, mainViewStyle]}>
            <TouchableOpacity activeOpacity={1} style={{ flex: 1, }} onPress={() => onPressPlayVideo()} >
                <Video
                    source={source}
                    onBuffer={onBuffer}
                    onError={onError}
                    style={styles.videoStyle}
                    resizeMode={"cover"}
                    paused={paused}
                    playWhenInactive={false}
                    repeat={repeat}
                    playInBackground={false}

                />
            </TouchableOpacity>
            {
                isBuffering ?
                    <View style={styles.bufferStyle}>
                        <ActivityIndicator color={colors.white} size={spacing.WIDTH_68} />
                    </View>
                    : null
            }
            {
                paused ?
                    <View style={styles.resumeButtonView}  >
                        <View style={styles.resumeBackground} />
                        <TouchableOpacity style={styles.playButtonContainer} onPress={() => onPressPlayVideo()}>
                            <Image source={Images.IMG_PLAY_ICON} style={styles.playIcon} />
                        </TouchableOpacity>
                    </View>
                    : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        height: HEIGHT,
    },
    videoStyle: {
        // flex: 1,
        // width: spacing.FULL_WIDTH,
        height: HEIGHT,
        // borderRadius: spacing.RADIUS_10,
        backgroundColor: colors.grey200,
    },
    resumeButtonView: {
        position: "absolute",
        width: "100%",
        height: HEIGHT,
        // borderRadius: spacing.RADIUS_12,
        justifyContent: "center",
        alignItems: "center",
    },
    resumeBackground: {
        backgroundColor: colors.grey600,
        position: "absolute",
        width: "100%",
        height: HEIGHT,
        opacity: 0.6,
        // borderRadius: spacing.RADIUS_12,
    },
    bufferStyle: {
        position: "absolute",
        width: "100%",
        height: HEIGHT,
        justifyContent: "center",
        backgroundColor: colors.transparentBlack,
        // borderRadius: spacing.RADIUS_12,
    },
    playButtonContainer: {
        backgroundColor: colors.red900,
        width: spacing.WIDTH_70,
        height: spacing.WIDTH_70,
        borderRadius: spacing.RADIUS_90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playIcon: {
        width: spacing.WIDTH_50,
        height: spacing.WIDTH_50,
        marginLeft: spacing.MARGIN_8,
        tintColor: colors.white
    },
    resumeText: {
        color: colors.white,
        marginTop: spacing.MARGIN_6,
        fontSize: textScale(13)
    },
});

export default CommonVideoPlayer;