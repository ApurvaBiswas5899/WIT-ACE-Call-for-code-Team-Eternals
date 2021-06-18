import {USER} from '../utils/user';

const initial = {
  auth: {},
  address: {},
  location: {},
};

export default function user(state = initial, action) {
  switch (action.type) {
    case USER.AUTH:
      return {...state, auth: {...action.data}};
    case USER.LOCATION:
      return {...state, location: {...action.data}};
    case USER.ADDRESS:
      return {...state, address: {...action.data}};
    case USER.LOGIN_SUCESS:
      return {...state, ...action.data};
    case USER.REGISTER_SUCESS:
      return {...state, ...action.data};
    default:
      return state;
  }
}
