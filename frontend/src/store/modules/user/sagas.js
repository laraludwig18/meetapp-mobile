import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';
import { updateUserSuccess } from '~/store/modules/user/actions';

export function* updateUser({ payload }) {
  try {
    const response = yield call(api.put, 'users', { ...payload.user });

    yield put(updateUserSuccess(response.data));
    history.push('/dashboard');
  } catch (error) {
    const { data } = error.response;
    toast.error(data.error);
  }
}

export default all([takeLatest('@user/UPDATE_USER_REQUEST', updateUser)]);
