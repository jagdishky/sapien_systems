import React from "react";
import { View, FlatList } from 'react-native'
import EquipmentComponentRow from "../rows/equipmentComponentRow";

interface equipmentComponentProps {
    data: Array<any>
}

const EquipmentComponent = ({ data }: equipmentComponentProps) => {
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item, index }) => <EquipmentComponentRow item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default EquipmentComponent