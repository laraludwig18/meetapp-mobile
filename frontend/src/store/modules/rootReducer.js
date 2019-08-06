import { combineReducers } from 'redux';

import auth from './auth/reducer';
import meetup from './meetup/reducer';
import user from './user/reducer';

export default combineReducers({
  auth,
  meetup,
  user,
});
