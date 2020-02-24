import { runSaga } from 'redux-saga';

import { apiMock } from '../../helper/mocks';
import { userCreated, error, user, token } from '../../helper/objects';

import { signFailure, signInSuccess } from '~/store/modules/auth/actions';
import { signIn, signUp } from '~/store/modules/auth/sagas';

describe('Auth saga', () => {
  it('should be able to post sessions and call signInSuccess', async () => {
    const dispatch = jest.fn();

    apiMock.onPost('sessions').reply(200, { user, token });

    await runSaga({ dispatch }, () =>
      signIn({ payload: { user } })
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(signInSuccess(token, user));
  });

  it('should post session fail and call signFailure', async () => {
    const dispatch = jest.fn();

    apiMock.onPost('sessions').reply(500, { error: error.serverError });

    await runSaga({ dispatch }, () =>
      signIn({ payload: { user } })
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(signFailure());
  });

  it('should post users fail and call signFailure', async () => {
    const dispatch = jest.fn();

    apiMock.onPost('users').reply(500, { error: error.serverError });

    await runSaga({ dispatch }, () =>
      signUp({ payload: { user: userCreated } })
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(signFailure());
  });
});
