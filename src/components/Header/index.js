import React from 'react';
import { StatusBar } from 'react-native';

import { Logo, Wrapper } from './styles';

export default function Header() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Wrapper>
        <Logo />
      </Wrapper>
    </>
  );
}
