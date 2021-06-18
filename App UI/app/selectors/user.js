export function getUserAddress(state) {
  return state.user.address;
}

export function getUserProfile(state) {
  if (state.user) {
    return state.user.auth;
  }
  return {
    name: '',
    lastname: '',
    email: '',
  };
}

export function getUserLocation(state) {
  return state.user.location;
}
