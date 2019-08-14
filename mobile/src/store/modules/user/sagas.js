import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';
import { updateUserSuccess } from '~/store/modules/user/actions';

export function* updateUser({ payload }) {
  try {
    const response = yield call(api.put, 'users', { ...payload.user });

    yield put(updateUserSuccess(response.data));
  } catch (error) {
    const { data } = error.response;
    Alert.alert('Erro na atualização', data.error);
  }
}

export default all([takeLatest('@user/UPDATE_USER_REQUEST', updateUser)]);
