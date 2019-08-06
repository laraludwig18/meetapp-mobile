import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { saveMeetupSuccess } from './actions';
import history from '~/services/history';
import api from '~/services/api';

export function* saveMeetup({ payload }) {
  const response = yield call(api.get, `meetups/${payload.id}`);

  yield put(saveMeetupSuccess(response.data));
}

export function* createMeetup({ payload }) {
  try {
    yield call(api.post, 'meetups', {
      ...payload.meetup,
    });

    history.push('/dashboard');
  } catch (error) {
    const { data } = error.response;
    toast.error(data.error);
  }
}

export function* updateMeetup({ payload }) {
  try {
    yield call(api.put, `meetups/${payload.id}`, {
      ...payload.meetup,
    });

    history.push('/dashboard');
  } catch (error) {
    const { data } = error.response;
    toast.error(data.error);
  }
}

export function* cancelMeetup({ payload }) {
  try {
    yield call(api.delete, `meetups/${payload.id}`);
    history.push('/dashboard');
  } catch (error) {
    const { data } = error.response;
    toast.error(data.error);
  }
}

export default all([
  takeLatest('@meetup/CANCEL_MEETUP', cancelMeetup),
  takeLatest('@meetup/CREATE_MEETUP', createMeetup),
  takeLatest('@meetup/UPDATE_MEETUP', updateMeetup),
  takeLatest('@meetup/SAVE_MEETUP_REQUEST', saveMeetup),
]);
