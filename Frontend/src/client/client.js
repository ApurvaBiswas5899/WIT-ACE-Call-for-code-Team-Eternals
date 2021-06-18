
import axios from 'axios';
import state from '../store.js';

import { API_ROOT } from '../utils/url';

export default class Client {
  register = async (
    email,
    password,
    name,
    lastname,
    dateOfBirth,
    gender,
    contactNo
  ) => {
    const data = {
      email,
      password,
      name,
      lastname,
      dateOfBirth,
      gender,
      contactNo,
    };

    try {
      const result = await axios.post(`${API_ROOT}/api/users/register`, data);

      console.log(result);
      return result.data;
    } catch (error) {
      return { error };
    }
  };

  login = async (email, password) => {
    const data = {
      email,
      password,
    };

    try {
      const result = await axios.post(`${API_ROOT}/api/users/login`, data);

      console.log(result);
      return result.data;
    } catch (error) {
      return { error };
    }
  };

  getAuth = async () => {
    try {
      const result = await axios.get(`${API_ROOT}/api/users/auth`);

      return result.data;
    } catch (error) {
      return { error };
    }
  };

  logout = async () => {
    try {
      const result = await axios.get(`${API_ROOT}/api/users/logout`);

      return result.data;
    } catch (error) {
      return { error };
    }
  };

  emailVerify = async (email, name) => {
    const data = {
      email,
      name,
    };

    try {
      const result = await axios.post(`${API_ROOT}/api/users/resend`, data);

      return result.data;
    } catch (error) {
      return { error };
    }
  };

  getOrder = async (userID) => {
    const data = {
      userID,
    };

    console.log(data);

    try {
      const response = await axios.post(
        `${API_ROOT}/api/users/getOrders`,
        data
      );

      console.log(response);

      return response.data;
    } catch (error) {
      return { error };
    }
  };
}
