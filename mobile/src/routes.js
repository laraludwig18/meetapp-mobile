import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { SignIn, SignUp } from '~/pages';

export default () =>
  createAppContainer(
    createSwitchNavigator({
      Sign: createSwitchNavigator({
        SignIn,
        SignUp,
      }),
    })
  );
