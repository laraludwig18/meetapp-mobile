import reducer, { INITIAL_STATE } from '~/store/modules/auth/reducer';
import * as Auth from '~/store/modules/auth/actions';
import { user, token } from '../../helper/objects';

describe('Auth reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('@auth/SIGN_IN_REQUEST', () => {
    const state = reducer(
      INITIAL_STATE,
      Auth.signInRequest('laraludwig18@gmail.com', '123456')
    );

    expect(state).toStrictEqual({
      token: null,
      signed: false,
      loading: true,
    });
  });

  it('@auth/SIGN_FAILURE', () => {
    const state = reducer(INITIAL_STATE, Auth.signFailure());

    expect(state).toStrictEqual({
      token: null,
      signed: false,
      loading: false,
    });
  });

  it('@auth/SIGN_UP_SUCCESS', () => {
    const state = reducer(INITIAL_STATE, Auth.signInSuccess(token, user));

    expect(state).toStrictEqual({
      token,
      signed: true,
      loading: false,
    });
  });

  it('@auth/SIGN_OUT', () => {
    const state = reducer(INITIAL_STATE, Auth.signOut());

    expect(state).toStrictEqual({
      token: null,
      signed: false,
      loading: false,
    });
  });
});
