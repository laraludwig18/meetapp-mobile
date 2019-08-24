import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';
import { logo } from '~/assets/images';
import { Container, Profile } from './styles';

export default function Header() {
  const name = useSelector(state => state.user.profile.name);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Link to="/dashboard">
        <img src={logo} alt="MeetApp" />
      </Link>
      <div>
        <Profile>
          <p data-testid="user-name">{name}</p>
          <Link to="/profile">Meu perfil</Link>
        </Profile>

        <button data-testid="sign-out" type="button" onClick={handleSignOut}>
          Sair
        </button>
      </div>
    </Container>
  );
}
