import React, { PureComponent } from 'react';
import { FlatList, RefreshControl, StyleSheetProperties, View, ViewStyle } from 'react-native';

interface MyProps {
    onScrollEndDrag: any
    onRefresh: () => any
    style: ViewStyle
    refreshing: boolean
    children: any
}

class VirtualizedView extends PureComponent<MyProps> {

    constructor(props: any) {
        super(props)
        // interface renderItemProps {
        //     renderItem: any
        //     index: number
        // }
    }

    render() {

        return (
            <View style={[{ flex: 1 }]} >
                <FlatList
                    data={[]}
                    ListEmptyComponent={null}
                    keyExtractor={(item, index) => "VirtualizedView" + index.toString()}
                    key={"VirtualizedView"}
                    renderItem={({ item, index }) => <></>}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={this.props.style}
                    onScroll={(scrollEvent) => {
                        if (this.props.onScrollEndDrag) {
                            this.props.onScrollEndDrag(scrollEvent)
                        }
                    }}
                    refreshControl={this.props.onRefresh ? <RefreshControl
                        onRefresh={() => {
                            if (this.props.onRefresh) {
                                this.props.onRefresh()
                            }
                        }}
                        refreshing={this.props.refreshing || false}
                    /> : null}
                    ListHeaderComponent={<React.Fragment>{this.props.children}</React.Fragment>}
                />
            </View>
        );
    }
}
export default VirtualizedView