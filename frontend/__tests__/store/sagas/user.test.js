import { runSaga } from 'redux-saga';
import { toast } from 'react-toastify';

import { apiMock } from '../../helper/mocks';
import { userPassUpdated, userUpdated, error } from '../../helper/objects';

import { updateUserSuccess } from '~/store/modules/user/actions';
import { updateUser } from '~/store/modules/user/sagas';

describe('User saga', () => {
  it('should be able to update user', async () => {
    const dispatch = jest.fn();

    apiMock.onPut('users').reply(200, userUpdated);

    await runSaga({ dispatch }, () =>
      updateUser({ payload: { userPassUpdated } })
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(updateUserSuccess(userUpdated));
  });

  it('should update users fail', async () => {
    const dispatch = jest.fn();

    const toastSpy = jest.spyOn(toast, 'error');

    apiMock.onPut('users').reply(500, { error: error.serverError });

    await runSaga({ dispatch }, () =>
      updateUser({ payload: { userPassUpdated } })
    ).toPromise();

    expect(toastSpy).toHaveBeenCalledWith(error.serverError);
  });
});
