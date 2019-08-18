import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
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
    history.push('/dashboard');
  } catch (error) {
    const { data } = error.response;
    toast.error(data.error);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    yield call(api.post, 'users', {
      ...payload.user,
    });
    history.push('/');
  } catch (error) {
    const { data } = error.response;
    toast.error(data.error);
    yield put(signFailure());
  }
}

export function signOut() {
  history.push('/');
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
  takeLatest('@auth/SIGN_OUT', signOut),
]);
