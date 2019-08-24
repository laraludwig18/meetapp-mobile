import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';

import { logo } from '~/assets/images';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insire um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="MeetApp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          data-testid="email"
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
        />
        <Input
          data-testid="password"
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button data-testid="submit" type="submit">
          Entrar
        </button>

        <Link to="/register">Criar conta grátis</Link>
      </Form>
    </>
  );
}
