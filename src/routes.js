/* eslint-disable react/prop-types */
import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Subscriptions from '~/pages/Subscriptions';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard: {
              screen: Dashboard,
              navigationOptions: {
                tabBarLabel: 'Meetups',
                tabBarIcon: ({ tintColor }) => (
                  <Icon
                    name="format-list-bulleted"
                    size={20}
                    color={tintColor}
                  />
                ),
              },
            },
            Subscriptions: {
              screen: Subscriptions,
              navigationOptions: {
                tabBarLabel: 'Inscrições',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="local-offer" size={20} color={tintColor} />
                ),
              },
            },
            Profile: {
              screen: Profile,
              navigationOptions: {
                tabBarLabel: 'Meu perfil',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="person" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#2B1A2F',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
