import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import colors from '../../../utility/colors';
import VirtualizedView from '../../common/VirtualizedView';
import CategoryListComponent from '../../modules/CategoryListComponent';
import FitnessPackagesListComponent from '../../modules/FitnessPackagesListComponent';

const Programs = () => {
    return (
        <VirtualizedView style={styles.mainContainer} key={"programsScreens"}  >
            <CategoryListComponent />
            <FitnessPackagesListComponent />
            {/* <ScrollView  /> */}
        </VirtualizedView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.grey100
    },
})


export default Programs;