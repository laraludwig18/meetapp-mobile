import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { navigate } from '~services/rootNavigation';
import api from '~/services/api';
import { updateUserSuccess } from '~/store/modules/user/actions';

export function* updateUser({ payload }) {
  try {
    const response = yield call(api.put, 'users', { ...payload.user });

    yield put(updateUserSuccess(response.data));
    navigate('Dashboard');
  } catch (error) {
    const { data } = error.response;
    Alert.alert('Erro ao atualizar perfil', data.message);
  }
}

export default all([takeLatest('@user/UPDATE_USER_REQUEST', updateUser)]);
