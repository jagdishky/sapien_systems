import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import RegularText from '../components/common/RegularText';
import ChatScreen from '../components/screens/bottomTabScreens/chat';
import FavoriteScreen from '../components/screens/bottomTabScreens/favorite';
import HomeScreen from '../components/screens/bottomTabScreens/home';
import JourneyScreen from '../components/screens/bottomTabScreens/journey';
import ProfileScreen from '../components/screens/bottomTabScreens/profile';
import { textScale } from '../styles/responsiveStyles';
import { spacing } from '../styles/spacing';
import { fontNames } from '../styles/typography';
import * as Utils from '../utility';
import colors from '../utility/colors';
import { Images } from '../utility/imagePaths';

const Tab = createBottomTabNavigator();
const activeTabColor = colors.theme;
const inActiveTabColor = colors.grey400;
const tabBarColor = colors.white;

const tabData = [
  {
    name: Utils.Constants.SCREEN_HOME,
    label: "Home",
    icon: Images.IMG_HOME,
    component: HomeScreen,
  },
  {
    name: Utils.Constants.SCREEN_JOURNEY,
    label: "Journey",
    icon: Images.IMG_JOURNEY,
    component: JourneyScreen,
  },
  {
    name: Utils.Constants.SCREEN_PROFILE,
    label: "Profile",
    icon: Images.IMG_PROFILE,
    component: ProfileScreen,
  },
  {
    name: Utils.Constants.SCREEN_FAVORITE,
    label: "Favorite",
    icon: Images.IMG_FAVORITE,
    component: FavoriteScreen,
  },
  {
    name: Utils.Constants.SCREEN_CHAT,
    label: "Chat",
    icon: Images.IMG_CHAT,
    component: ChatScreen,
  },
];






function BottomTabs({ }) {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: activeTabColor,
          tabBarInactiveTintColor: inActiveTabColor,
          tabBarStyle: {
            backgroundColor: tabBarColor,
            paddingBottom: 0,
            height: spacing.HEIGHT_56,
          },
          tabBarLabelStyle: { alignSelf: 'center' },
          tabBarAllowFontScaling: true,
          // tabBarItemStyle: { alignSelf: 'center', justifyContent: 'center' },
          headerShown: false,
        }}>
        {tabData.map((item, index) => {
          return (
            <Tab.Screen
              key={`bottomTabMain_${index.toString()}`}
              name={item.name}
              component={item.component}
              listeners={({ navigation, route }) => ({
                tabPress: e => { },
              })}
              options={{
                tabBarLabel: item.label,
                tabBarIcon: ({ focused }) => {
                  return (
                    <View style={{ alignItems: "center" }} >
                      <Image
                        source={item.icon}
                        style={[styles.iconStyle,
                        focused && { tintColor: colors.red900 },
                        item.name == Utils.Constants.SCREEN_HOME && { width: spacing.WIDTH_30 }]}
                        resizeMode="contain"
                      />
                      <RegularText style={[styles.label, !focused && { color: colors.grey600 }]} >{item.label}</RegularText>
                    </View>
                  );
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    height: spacing.HEIGHT_18,
    width: spacing.HEIGHT_18,
    tintColor: colors.grey600
  },
  label: {
    fontSize: textScale(8),
    fontFamily: fontNames.FONT_FAMILY_BOLD,
    marginTop: spacing.MARGIN_4,
    color: colors.red900
  },
  badgeStyle: {
    backgroundColor: colors.red600,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(BottomTabs);
