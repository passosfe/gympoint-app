import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';

import SignIn from './pages/SignIn';

import CheckIn from './pages/CheckIn';
import Help from './pages/Help';
import NewHelpRequest from './pages/NewHelpRequest';
import QuestionDetails from './pages/QuestionDetails';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: SignIn,
        App: createBottomTabNavigator(
          {
            CheckIn,
            Help: {
              screen: createStackNavigator(
                {
                  Help,
                  NewHelpRequest,
                  QuestionDetails,
                },
                {
                  defaultNavigationOptions: {
                    headerBackTitle: 'Voltar',
                    headerTintColor: '#ee4e62',
                    headerTitleAlign: 'center',
                    headerTitle: () => <Header />,
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir Ajuda',
                // eslint-disable-next-line react/prop-types
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999',
              keyboardHidesTabBar: true,
              labelStyle: {
                fontSize: 14,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
