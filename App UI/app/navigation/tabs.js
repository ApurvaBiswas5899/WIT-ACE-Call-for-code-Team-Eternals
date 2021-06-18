import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Svg, {Path} from 'react-native-svg';
import {isIphoneX} from 'react-native-iphone-x-helper';

import {Home, Profile} from '../screens';

import {COLORS} from '../constants';
import Icon from '../components/icon';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  const isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.lightGray,
            }}
          />
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.lightGray}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: COLORS.lightGray}} />
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.primary,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 60,
        backgroundColor: COLORS.lightGray,
      }}
      activeOpacity={1}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const CustomTabBar = props => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: COLORS.lightGray,
          }}
        />
        <BottomTabBar {...props.props} />
      </View>
    );
  }
  return <BottomTabBar {...props.props} />;
};

const Tabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: {
        position: 'absolute',
        left: 0,
        bottom: 10,
        right: 0,
        borderTopWidth: 0,
        elevation: 0,
        backgroundColor: 'transparent',
      },
    }}
    tabBar={props => <CustomTabBar props={props} />}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon name="cutlery" color={focused ? '#fff' : 'grey'} size={24} />
        ),
        tabBarButton: props => <TabBarCustomButton {...props} />,
      }}
    />

    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon name="user" color={focused ? '#fff' : 'grey'} size={24} />
        ),
        tabBarButton: props => <TabBarCustomButton {...props} />,
      }}
    />
  </Tab.Navigator>
);

export default Tabs;
