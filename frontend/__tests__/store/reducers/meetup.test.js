import reducer, { INITIAL_STATE } from '~/store/modules/meetup/reducer';
import * as Meetup from '~/store/modules/meetup/actions';
import { meetup } from '../../helper/objects';

describe('Meetup reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('@meetup/SAVE_MEETUP_REQUEST', () => {
    const state = reducer(INITIAL_STATE, Meetup.saveMeetupRequest(meetup.id));

    expect(state).toStrictEqual({
      info: null,
      loading: true,
    });
  });

  it('@meetup/SAVE_MEETUP_SUCCESS', () => {
    const state = reducer(INITIAL_STATE, Meetup.saveMeetupSuccess(meetup));

    expect(state).toStrictEqual({
      info: meetup,
      loading: false,
    });
  });
});
