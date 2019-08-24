import { produce } from 'immer';

export const INITIAL_STATE = {
  info: null,
  loading: true,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/SAVE_MEETUP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/SAVE_MEETUP_SUCCESS': {
        draft.info = action.payload.meetup;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
