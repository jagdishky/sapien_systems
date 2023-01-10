import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import ProgramDetailScreen from '../components/screens/programDetail';
import * as Utils from '../utility';
import bottomTabs from './bottomTabs';

const Stack = createStackNavigator();

function AppStack({ }) {

    return (
        <View style={{ flex: 1 }} >
            <NavigationContainer >
                <Stack.Navigator
                    initialRouteName={Utils.Constants.KEY_BOTTOM_TAB_NAVIGATOR}
                    screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
                    <Stack.Screen name={Utils.Constants.KEY_BOTTOM_TAB_NAVIGATOR} component={bottomTabs} />
                    <Stack.Screen name={Utils.Constants.SCREEN_PROGRAM_DETAIL} component={ProgramDetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

export default AppStack;