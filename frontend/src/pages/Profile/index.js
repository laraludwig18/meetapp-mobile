import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { updateUserRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

const schema = Yup.object().shape(
  {
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insire um e-mail válido')
      .required('O e-mail é obrigatório'),
    actualPassword: Yup.string().when('password', {
      is: '',
      then: Yup.string(),
      otherwise: Yup.string().required('Digite a senha antiga'),
    }),
    password: Yup.string().when('actualPassword', {
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
  ['actualPassword', 'password', 'confirmPassword']
);

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit({
    name,
    email,
    actualPassword,
    password,
    confirmPassword,
  }) {
    let data = {};
    if (actualPassword && password && confirmPassword) {
      data = {
        name,
        email,
        actualPassword,
        password,
        confirmPassword,
      };
    } else {
      data = {
        name,
        email,
      };
    }

    dispatch(updateUserRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit} initialData={profile}>
        <Input name="name" placeholder="Nome completo" />
        <Input
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          initialData={profile}
        />
        <hr />
        <Input
          name="actualPassword"
          type="password"
          placeholder="Senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />

        <button type="submit">
          <MdAddCircleOutline size={20} />
          Salvar perfil
        </button>
      </Form>
    </Container>
  );
}
