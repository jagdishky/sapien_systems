import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import colors from '../../../../utility/colors';
import { SCREEN_BRANDS_TAB, SCREEN_PROGRAMS_TAB, SCREEN_TEACHER_TAB, SCREEN_TRACKERS_TAB, SCREEN_WORKOUTS_TAB } from "../../../../utility/constants";
import CommonHeader from '../../../common/CommonHeader';
import CommonTopTabs from "../../../common/topTab/CommonTopTabs";
import Brands from '../../Brands';
import Programs from "../../programs";
import Teachers from "../../Teachers";
import Tracker from '../../Tracker';
import Workouts from '../../Workouts';

const tabsData = [
    {
        tabName: SCREEN_TRACKERS_TAB,
        label: 'Tracker',
        component: Tracker
    },
    {
        tabName: SCREEN_WORKOUTS_TAB,
        label: 'Workout',
        component: Workouts
    },
    {
        tabName: SCREEN_PROGRAMS_TAB,
        label: 'Programs',
        component: Programs
    },
    {
        tabName: SCREEN_TEACHER_TAB,
        label: 'Teachers',
        component: Teachers
    },
    {
        tabName: SCREEN_BRANDS_TAB,
        label: 'Brands',
        component: Brands
    },
]



const HomeScreen = () => {
    return (
        <View style={styles.mainContainer} key={'homeScreen'} >
            <CommonHeader title='Movement' hideBackIcon={true} />
            <View style={styles.headerHeight} />
            <CommonTopTabs tabsData={tabsData} scrollEnabled initialRouteName={SCREEN_PROGRAMS_TAB} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerHeight: {
        height: spacing.HEIGHT_34,
        backgroundColor: colors.theme
    },
})

export default HomeScreen;