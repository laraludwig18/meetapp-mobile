export function updateUserRequest(user) {
  return {
    type: '@user/UPDATE_USER_REQUEST',
    payload: {
      user,
    },
  };
}

export function updateUserSuccess(user) {
  return {
    type: '@user/UPDATE_USER_SUCCESS',
    payload: {
      user,
    },
  };
}
