import axios from "axios";
import { Images } from "./dumyData/images";

export default class Filter {
  updateFilter = (status, rating, category, latitude, longitude) => {
    const data = {
      status,
      rating,
      category,
      latitude,
      longitude,
    };

    // try {
    //   const result = await axios.post(
    //     `https://burppbackend.herokuapp.com/api/filters/getRestaurants`,
    //     data
    //   );
    //   console.log(result);
    //   return result.data;
    // } catch (error) {
    //   return { error };
    // }

    return Images;
  };
}
