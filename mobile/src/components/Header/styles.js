import styled from 'styled-components/native';
import { Header } from 'react-navigation';

import { logo } from '~/assets/images';

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  height: 24px;
  width: 23px;
`;

export const Wrapper = styled.SafeAreaView`
  height: 75px;
  padding-top: 32px;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
`;
