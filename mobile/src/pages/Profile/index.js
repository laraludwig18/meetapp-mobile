import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { signOut } from '~/store/modules/auth/actions';
import { updateUserRequest } from '~/store/modules/user/actions';
import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  Form,
  FormInput,
  LogoutButton,
  Separator,
  SubmitButton,
} from './styles';

const schema = Yup.object().shape(
  {
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insire um e-mail válido')
      .required('O e-mail é obrigatório'),
    oldPassword: Yup.string().when('password', {
      is: '',
      then: Yup.string(),
      otherwise: Yup.string().required('Digite a senha antiga'),
    }),
    password: Yup.string().when('oldPassword', {
      is: '',
      then: Yup.string(),
      otherwise: Yup.string().min(6, 'A nova senha deve conter 6 caracteres'),
    }),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password
        ? field
            .required('Confirmação de senha é obrigatória')
            .oneOf(
              [Yup.ref('password')],
              'Nova senha e sua confirmação devem ser iguais'
            )
        : field
    ),
  },
  ['oldPassword', 'password', 'confirmPassword']
);

function Profile({ isFocused }) {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [isFocused]);

  useEffect(() => {
    setErrors({});
  }, [name, email, oldPassword, password, confirmPassword]);

  async function handleSubmit() {
    setErrors({});
    const user = { name, email, oldPassword, password, confirmPassword };
    try {
      await schema.validate(user);

      dispatch(
        updateUserRequest(
          oldPassword && password && confirmPassword ? user : { name, email }
        )
      );
    } catch (error) {
      setErrors({ ...errors, [error.path]: error.message });
    }
  }

  function logout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <FormInput
            placeholder="Nome completo"
            hasError={!!errors.name}
            messageError={errors.name || null}
            autoCorrect={false}
            value={name}
            onChangeText={setName}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <FormInput
            ref={emailRef}
            hasError={!!errors.email}
            messageError={errors.email || null}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
          />
          <Separator />
          <FormInput
            ref={oldPasswordRef}
            hasError={!!errors.actualPassword}
            messageError={errors.actualPassword || null}
            placeholder="Senha atual"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            ref={passwordRef}
            placeholder="Nova senha"
            secureTextEntry
            hasError={!!errors.password}
            messageError={errors.password || null}
            value={password}
            onChangeText={setPassword}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />
          <FormInput
            ref={confirmPasswordRef}
            placeholder="Confirmação de senha"
            secureTextEntry
            hasError={!!errors.confirmPassword}
            messageError={errors.confirmPassword || null}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
          <LogoutButton onPress={logout}>Sair do Meetapp</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Profile);

Profile.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};
