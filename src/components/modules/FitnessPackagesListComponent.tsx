import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { GET_FITNESS_PACKAGE_LIST } from '../../graphql/fitnessPackage/queries';
import { GQL_TYPE_FITNESS_PACKAGES } from '../../graphql/types';
import { SCREEN_PROGRAM_DETAIL } from '../../utility/constants';
import FitnessPackagesListComponentRow from '../rows/fitnessPackagesListComponentRow';

const FitnessPackagesListComponent = () => {

    const navigation = useNavigation();

    const { loading: fitnessPackageLoading, error: fitnessPackageError, data: fitnessPackageRes, refetch: refetchData } = useQuery(GET_FITNESS_PACKAGE_LIST)

    function onPressProgram(item: Record<string, any>, index: number | undefined) {
        navigation.navigate(SCREEN_PROGRAM_DETAIL, { id: item?.id })
    }
    console.log(fitnessPackageLoading);

    return (
        <View style={styles.mainContainer} key={"FitnessPackagesListComponent"} >
            <FlatList
                data={fitnessPackageLoading || fitnessPackageLoading == undefined ? [1, 1, 1, 1] : fitnessPackageRes && fitnessPackageRes[GQL_TYPE_FITNESS_PACKAGES].data}
                renderItem={({ item, index }) => {
                    return (
                        <FitnessPackagesListComponentRow
                            key={"FitnessPackagesListComponentRow" + index}
                            item={item}
                            index={index}
                            onPressProgram={onPressProgram}
                            price={item?.attributes?.fitnesspackagepricing[0]?.mrp}
                            isLoading={fitnessPackageLoading}
                        />
                    )
                }}
                listKey="FitnessPackagesListComponent_flatlist"
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        // marginVertical: spacing.MARGIN_18,
    },
})


export default FitnessPackagesListComponent;