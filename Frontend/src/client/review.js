import axios from 'axios';

import { API_ROOT } from '../utils/url';

export default class Review {
  saveReview = async (
    heading,
    comment,
    rating,
    writer,
    restaurantID,
    images
  ) => {
    const reviewdata = {
      heading,
      comment,
      rating,
      writer,
      restaurantID,
      images,
    };
    try {
      const result = await axios.post(
        `${API_ROOT}/api/review/saveReview`,
        reviewdata
      );
      return result.data;
    } catch (error) {
      return { error };
    }
  };

  getReview = async (restaurantId) => {
    const restaurantData = {
      restaurantId,
    };
    try {
      const result = await axios.post(
        `${API_ROOT}/api/review/getReview`,
        restaurantData
      );
      return result.data;
    } catch (error) {
      return { error };
    }
  };
}
