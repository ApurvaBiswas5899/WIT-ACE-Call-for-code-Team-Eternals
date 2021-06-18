import * as Location from 'expo-location';
import Client from '../../client';
import {getUserProfile} from '../../selectors/user';
import {USER} from '../../utils/user';

export function registerUser(email, name, lastname, password, image) {
  return async () => {
    const result = await Client.register(
      email,
      name,
      lastname,
      password,
      image,
    );
    if (result.message) {
      return {
        success: false,
        message: result.message,
      };
    }
    return {
      success: true,
    };
  };
}

export function loginUser(email, name, lastname, password, image) {
  return async dispatch => {
    const result = await Client.login(email, name, lastname, password, image);
    if (result.loginSuccess) {
      dispatch({
        type: USER.LOGIN_SUCESS,
        data: result.id,
      });
      return {success: true};
    }
    return {
      success: false,
      error: result.message,
    };
  };
}

export function getAuth() {
  return async dispatch => {
    const result = await Client.getAuth();
    if (result.isAuth) {
      dispatch({
        type: USER.AUTH,
        data: {auth: result},
      });
      return {success: true};
    }
    return {
      sucess: false,
      error: result.error,
    };
  };
}

export function setLastKnownLocation() {
  return async (dispatch, getState) => {
    const location = await Location.getLastKnownPositionAsync({
      accuracy: Location.Accuracy.Low,
    });
    await dispatch({
      type: USER.LOCATION,
      data: location,
    });
    const address = await Location.reverseGeocodeAsync(location.coords);
    dispatch({
      type: USER.ADDRESS,
      data: address[0],
    });
  };
}

// check permission before calling
export function updateLocation() {
  return async dispatch => {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    });
    if (!location?.coords) {
      location = await Location.getLastKnownPositionAsync();
      if (!location?.coords) {
        return;
      }
    }
    dispatch({
      type: USER.LOCATION,
      data: location,
    });
    const address = await Location.reverseGeocodeAsync(location.coords);
    dispatch({
      type: USER.ADDRESS,
      data: address[0],
    });
  };
}

export function logout() {
  return async (dispatch, getState) => {
    const user = getUserProfile(getState());
    const result = await Client.logout(user.auth.email);
    if (result?.success) {
      dispatch({
        type: USER.LOGOUT,
        data: {},
      });
    }
  };
}
