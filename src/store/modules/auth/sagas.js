import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { navigate } from '~services/rootNavigation';
import api from '~/services/api';

import { signFailure, signInSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    yield put(signInSuccess(token, user));
  } catch (error) {
    const { data } = error.response;
    Alert.alert('Erro no login', data.message);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    yield call(api.post, 'users', {
      ...payload.user,
    });

    navigate('SignIn');
  } catch (error) {
    const { data } = error.response;
    Alert.alert('Erro na criação', data.message);
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_SUCCESS', signUp),
]);
