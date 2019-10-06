import { runSaga } from 'redux-saga';
import { toast } from 'react-toastify';

import history from '~/services/history';
import { apiMock } from '../../helper/mocks';
import { error, meetup, meetupCreated } from '../../helper/objects';

import { saveMeetupSuccess } from '~/store/modules/meetup/actions';
import {
  cancelMeetup,
  createMeetup,
  saveMeetup,
  updateMeetup,
} from '~/store/modules/meetup/sagas';

describe('Meetup saga', () => {
  it('should be able to save meetup', async () => {
    const dispatch = jest.fn();

    apiMock.onGet(`meetups/${meetup.id}`).reply(200, meetup);

    await runSaga({ dispatch }, () =>
      saveMeetup({ payload: { id: meetup.id } })
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(saveMeetupSuccess(meetup));
  });

  it('should be able to create meetup', async () => {
    const dispatch = jest.fn();

    const push = jest.spyOn(history, 'push');

    apiMock.onPost('meetups').reply(200, meetup);

    await runSaga({ dispatch }, () =>
      createMeetup({ payload: { meetup: meetupCreated } })
    ).toPromise();

    expect(push).toHaveBeenCalledWith('/dashboard');
  });

  it('should fail when create meetup and call toast.error', async () => {
    const dispatch = jest.fn();

    const toastSpy = jest.spyOn(toast, 'error');

    apiMock.onPost('meetups').reply(500, { error: error.serverError });

    await runSaga({ dispatch }, () =>
      createMeetup({ payload: { meetup: meetupCreated } })
    ).toPromise();

    expect(toastSpy).toHaveBeenCalledWith(error.serverError);
  });

  it('should be able to update meetup', async () => {
    const dispatch = jest.fn();

    const push = jest.spyOn(history, 'push');

    apiMock.onPut(`meetups/${meetup.id}`).reply(200, meetup);

    await runSaga({ dispatch }, () =>
      updateMeetup({ payload: { id: meetup.id, meetup } })
    ).toPromise();

    expect(push).toHaveBeenCalledWith('/dashboard');
  });

  it('should fail when update meetup and call toast.error', async () => {
    const dispatch = jest.fn();

    const toastSpy = jest.spyOn(toast, 'error');

    apiMock
      .onPut(`meetups/${meetup.id}`)
      .reply(500, { error: error.serverError });

    await runSaga({ dispatch }, () =>
      updateMeetup({ payload: { id: meetup.id, meetup } })
    ).toPromise();

    expect(toastSpy).toHaveBeenCalledWith(error.serverError);
  });

  it('should be able to cancel meetup', async () => {
    const dispatch = jest.fn();

    const push = jest.spyOn(history, 'push');

    apiMock.onDelete(`meetups/${meetup.id}`).reply(200, { ok: true });

    await runSaga({ dispatch }, () =>
      cancelMeetup({ payload: { id: meetup.id } })
    ).toPromise();

    expect(push).toHaveBeenCalledWith('/dashboard');
  });

  it('should fail when cancel meetup and call toast.error', async () => {
    const dispatch = jest.fn();

    const toastSpy = jest.spyOn(toast, 'error');

    apiMock
      .onDelete(`meetups/${meetup.id}`)
      .reply(500, { error: error.serverError });

    await runSaga({ dispatch }, () =>
      cancelMeetup({ payload: { id: meetup.id } })
    ).toPromise();

    expect(toastSpy).toHaveBeenCalledWith(error.serverError);
  });
});
