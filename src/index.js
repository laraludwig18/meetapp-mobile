import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import OneSignal from 'react-native-onesignal';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from '~/services/rootNavigation';
import '~/config/ReactotronConfig';
import { store, persistor } from '~/store';
import App from '~/App';

export default class Index extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('81342dec-4f86-457b-9ab4-3a0e75cddfc1');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = () => {};

  onOpened = () => {};

  onIds = () => {};

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <StatusBar barStyle="light-content" backgroundColor="#22202C" />
            <App />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    );
  }
}
