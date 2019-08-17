import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';
import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  Logo,
  SignUpLink,
  SubmitButton,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insire um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn({ navigation }) {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const passwordRef = useRef();

  useEffect(() => {
    setErrors({});
  }, [email, password]);

  function goToSignUp() {
    navigation.navigate('SignUp');
  }

  async function handleSubmit() {
    try {
      await schema.validate({ email, password });

      dispatch(signInRequest(email, password));
    } catch (error) {
      setErrors({ ...errors, [error.path]: error.message });
    }
  }

  return (
    <Background>
      <Container>
        <Logo />

        <Form>
          <FormInput
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            hasError={!!errors.email}
            messageError={errors.email || null}
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
            hasError={!!errors.password}
            messageError={errors.password || null}
            onChangeText={setPassword}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar
          </SubmitButton>
        </Form>

        <SignUpLink onPress={goToSignUp}>Criar conta grátis</SignUpLink>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
