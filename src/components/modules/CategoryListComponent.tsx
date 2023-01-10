import { useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { GET_FITNESS_DISCIPLINES_LIST } from '../../graphql/fitnessDiscipline/queries';
import CategoryListComponentRow from '../rows/categoryListComponentRow ';

const CategoryListComponent = () => {

    const [selectedCategory, setSelectedCategory] = useState(0)

    // const { loading: fitnessDisciplineLoading, error: fitnessDisciplineError, data: fitnessDisciplineRes, refetch: refetchData } = useQuery(GET_FITNESS_DISCIPLINES_LIST, {
    //     onCompleted: (res) => { }
    // })

    function onPressCategory(item: object, index: number) {
        setSelectedCategory(index)
    }
    return (
        <View style={styles.mainContainer} key={"CategoryListComponent"} >
            <FlatList
                data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                renderItem={({ item, index }) => {
                    return (
                        <CategoryListComponentRow
                            key={"CategoryListComponentRow" + index}
                            item={item}
                            index={index}
                            selectedCategory={selectedCategory}
                            onPressCategory={onPressCategory}
                        />
                    )
                }}
                listKey="CategoryListComponent_flatlist"
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {

    },
})


export default CategoryListComponent;