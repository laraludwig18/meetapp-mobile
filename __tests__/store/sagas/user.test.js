import { runSaga } from 'redux-saga';
import { Alert } from 'react-native';

import { apiMock } from '../../helper/mocks';
import { userPassUpdated, userUpdated, error } from '../../helper/objects';

import { updateUserSuccess } from '~/store/modules/user/actions';
import { updateUser } from '~/store/modules/user/sagas';

describe('User saga', () => {
  it('should be able to update user', async () => {
    const dispatch = jest.fn();
    apiMock.onPut('users').reply(200, userUpdated);
    await runSaga({ dispatch }, () =>
      updateUser({ payload: { user: userPassUpdated } })
    ).toPromise();
    expect(dispatch).toHaveBeenCalledWith(updateUserSuccess(userUpdated));
  });

  it('should update users fail', async () => {
    const dispatch = jest.fn();

    const alertMock = jest.spyOn(Alert, 'alert');

    apiMock.onPut('users').reply(500, { message: error.serverError });

    await runSaga({ dispatch }, () =>
      updateUser({ payload: { userPassUpdated } })
    ).toPromise();

    expect(alertMock).toHaveBeenCalledWith(
      'Erro ao atualizar perfil',
      error.serverError
    );
  });
});
