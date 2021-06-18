import axios from 'axios';
import { API_ROOT } from '../utils/url';

export default class Review {
  // need to import values from restaurent

  showCart = async () => {
    try {
      const result = await axios.post(`${API_ROOT}/api/cart/`);
      return result;
    } catch (error) {
      return { error };
    }
  };

  addItems = async (values) => {
    let dataToSubmit = {
      productId: values.id,
    };

    try {
      const result = await axios.post(
        `${API_ROOT}/api/cart/add/:id`,
        dataToSubmit
      );
      return result;
    } catch (error) {
      return { error };
    }
  };

  removeItems = async (values) => {
    let dataToSubmit = {
      productId: values.id,
    };

    try {
      const result = await axios.post(
        `${API_ROOT}/api/cart/remove/:id`,
        dataToSubmit
      );
      return result;
    } catch (error) {
      return { error };
    }
  };
}
