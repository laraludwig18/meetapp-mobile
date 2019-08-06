export function saveMeetupRequest(id) {
  return {
    type: '@meetup/SAVE_MEETUP_REQUEST',
    payload: {
      id,
    },
  };
}

export function saveMeetupSuccess(meetup) {
  return {
    type: '@meetup/SAVE_MEETUP_SUCCESS',
    payload: {
      meetup,
    },
  };
}

export function createMeetup(meetup) {
  return {
    type: '@meetup/CREATE_MEETUP',
    payload: {
      meetup,
    },
  };
}

export function updateMeetup(meetup, id) {
  return {
    type: '@meetup/UPDATE_MEETUP',
    payload: {
      meetup,
      id,
    },
  };
}

export function removeMeetup(id) {
  return {
    type: '@meetup/CANCEL_MEETUP',
    payload: {
      id,
    },
  };
}
