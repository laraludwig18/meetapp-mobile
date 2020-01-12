import reducer, { INITIAL_STATE } from '~/store/modules/user/reducer';
import * as Auth from '~/store/modules/auth/actions';
import * as User from '~/store/modules/user/actions';
import { user, userUpdated, token } from '../../helper/objects';

describe('User reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('@auth/SIGN_UP_SUCCESS', () => {
    const state = reducer(INITIAL_STATE, Auth.signInSuccess(token, user));

    expect(state).toStrictEqual({
      profile: user,
    });
  });

  it('@auth/SIGN_OUT', () => {
    const state = reducer(INITIAL_STATE, Auth.signOut());

    expect(state).toStrictEqual({
      profile: null,
    });
  });

  it('@user/UPDATE_USER_SUCCESS', () => {
    const state = reducer(INITIAL_STATE, User.updateUserSuccess(userUpdated));

    expect(state).toStrictEqual({
      profile: userUpdated,
    });
  });
});
