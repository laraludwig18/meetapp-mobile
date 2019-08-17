import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

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

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insire um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve conter mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    setErrors({});
  }, [name, email, password]);

  function goToSignIn() {
    navigation.navigate('SignIn');
  }

  async function handleSubmit() {
    try {
      const user = { name, email, password };
      await schema.validate(user);

      dispatch(signUpSuccess(user));
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
            placeholder="Nome completo"
            autoCorrect={false}
            value={name}
            onChangeText={setName}
            hasError={!!errors.name}
            messageError={errors.name || null}
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
            hasError={!!errors.email}
            messageError={errors.email || null}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            ref={passwordRef}
            placeholder="Sua senha secreta"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            hasError={!!errors.password}
            messageError={errors.password || null}
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
