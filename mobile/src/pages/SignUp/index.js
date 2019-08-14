import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { signUpSuccess } from '~/store/modules/auth/actions';
import Background from '~/components/Background';
import {
  Container,
  Form,
  FormInput,
  Logo,
  SignInLink,
  SubmitButton,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  function goToSignIn() {
    navigation.navigate('SignIn');
  }

  function handleSubmit() {
    dispatch(
      signUpSuccess({
        name,
        email,
        password,
      })
    );
  }

  return (
    <Background>
      <Container>
        <Logo />

        <Form>
          <FormInput
            placeholder="Nome completo"
            autoCorrect={false}
            value={name}
            onChangeText={setName}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <FormInput
            ref={emailRef}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            ref={passwordRef}
            placeholder="Sua senha secreta"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton onPress={handleSubmit}>Criar conta</SubmitButton>
        </Form>

        <SignInLink onPress={goToSignIn}>Já tenho login</SignInLink>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
