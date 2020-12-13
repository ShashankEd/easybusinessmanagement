import React from 'react';
import 'react-native-gesture-handler';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR} from '../utils/colors';
import {
    UserLogin,
    UserList,
    NewsFeed,
    Setting
} from '../screens';

/**
 * Tab Navigator, can be used as a screen to which we can navigate to
 */

const TabNavigator = createBottomTabNavigator(
    {
        UserListScreen: {
        screen: UserList,
        navigationOptions: {
          tabBarLabel: 'UserList',
        //   tabBarIcon: ({tintColor}) => (
        //     <Icon name="rocket" size={30} color={tintColor} />
        //   ),
        },
      },
      NewsFeedScreen: {
        screen: NewsFeed,
        navigationOptions: {
          tabBarLabel: 'NewsFeed',
        //   tabBarIcon: ({tintColor}) => (
        //     <Icon name="rocket" size={30} color={tintColor} />
        //   ),
        },
      },
      SettingScreen: {
        screen: Setting,
        navigationOptions: {
          tabBarLabel: 'Setting',
        //   tabBarIcon: ({tintColor}) => (
        //     <Icon name="rocket" size={30} color={tintColor} />
        //   ),
        },
      },
    },
    {
      initialRouteName: 'UserListScreen',
      tabBarOptions: {
        labelPosition: 'below-icon',
        style: {height: 50},
        activeTintColor: COLOR.PRIMARY,
        inactiveTintColor: COLOR.INACTIVE_TAB,
        showIcon: true,
        labelStyle: {
          fontSize: 20,
          marginBottom: 20,
          lineHeight: 20,
        },
      },
    },
  );

const AppStackNavigator = createStackNavigator(
    {
        TabNavigatorScreen: {
            screen: TabNavigator,
        },
        UserLoginScreen :{
            screen : UserLogin
        }
    },
    { 
       initialRouteName: 'UserLoginScreen',
       headerMode: 'none',
    }
);
// const AppNavigator = createSwitchNavigator({
//     App: AppStackNavigator,
//   });
export default createAppContainer(AppStackNavigator);
