
import axios from 'axios';
import { API_ROOT } from '../utils/url';
import { setup } from "axios-cache-adapter";
import localforage from "localforage";
import memoryDriver from "localforage-memoryStorageDriver";

export default class Filter {

  updateFilter = async (status, rating, category, latitude, longitude) => {
    const data = {
      status,
      rating,
      category,
      latitude,
      longitude,
    };

    try {
      await localforage.defineDriver(memoryDriver);
      const forageStore = localforage.createInstance({
        // List of drivers used
        driver: [
          localforage.INDEXEDDB,
          localforage.LOCALSTORAGE,
          memoryDriver._driver,
        ],
        // Prefix all storage keys to prevent conflicts
        name: "homePage",
      });
      const api = setup({
        baseURL: `${API_ROOT}/`,
        cache: {
          maxAge: 2 * 60 * 1000, // 2 min age of the chase
          exclude: {
            // Only exclude PUT, PATCH and DELETE methods from cache
            methods: ["put", "patch", "delete"],
            query: false,
          },
          store: forageStore,
        },
      });

      return api.post("api/filters/getRestaurants", data).then(async (response) => {
        return response.data;
      });
    } catch (error) {
      return { error };
    }
  };
}
