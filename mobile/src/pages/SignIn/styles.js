import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { logo } from '~/assets/images';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 8px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  height: 42px;
  width: 41px;
`;

export const SignUpLink = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
  font-size: 16px;
  margin-top: 15px;
  padding: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
`;
