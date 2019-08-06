import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import meetup from './meetup/sagas';
import user from './user/sagas';

export default function* rootSaga() {
  return yield all([auth, meetup, user]);
}
