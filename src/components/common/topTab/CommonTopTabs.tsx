import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import colors from '../../../utility/colors';

const Tab = createMaterialTopTabNavigator();

const tabActiveColor = colors.white
const tabLabelActiveColor = colors.white
const tabLabelInActiveColor = colors.grey600

interface topTabProps {
    tabsData: Array<any>,
    scrollEnabled?: boolean,
    activeColor?: string,
    inActiveColor?: string,
    tabsColor?: string,
    isCustom?: true,
    swipeEnabled?: boolean
    initialRouteName?: string
    backgroundColor?: string
    indicatorBackgroundColor?: string
}

const CommonTopTabs = ({ tabsData, scrollEnabled, activeColor, inActiveColor, initialRouteName, backgroundColor, indicatorBackgroundColor }: topTabProps) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: activeColor ? activeColor : tabLabelActiveColor,
                tabBarInactiveTintColor: inActiveColor ? inActiveColor : tabLabelInActiveColor,
                tabBarAllowFontScaling: scrollEnabled == true ? false : true,
                tabBarScrollEnabled: scrollEnabled ? scrollEnabled : false,
                tabBarPressColor: colors.transparent,
                tabBarLabelStyle: {
                    fontSize: textScale(12),
                    textTransform: 'none',
                    fontFamily: fontNames.FONT_FAMILY_MEDIUM,
                },
                tabBarStyle: {
                    backgroundColor: backgroundColor ? backgroundColor : colors.theme,
                    height: spacing.HEIGHT_80,
                },
                tabBarContentContainerStyle: {},
                tabBarItemStyle: {
                    width: spacing.FULL_WIDTH / 3.8
                },
                tabBarIndicatorContainerStyle: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: indicatorBackgroundColor ? indicatorBackgroundColor : tabActiveColor,
                    height: spacing.HEIGHT_2,
                    marginBottom: spacing.MARGIN_26,
                },
            }}
            backBehavior='initialRoute'
            initialRouteName={initialRouteName}
        >
            {
                tabsData.map((item, index) => {
                    return (
                        <Tab.Screen
                            name={item.tabName}
                            options={{
                                title: item.label,
                            }}
                            component={item.component}
                            key={index.toString() + '_' + item.tabName}
                        />
                    )
                })
            }
        </Tab.Navigator>
    )
}

export default React.memo(CommonTopTabs);