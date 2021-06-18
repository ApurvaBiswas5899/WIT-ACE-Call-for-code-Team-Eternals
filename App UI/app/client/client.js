import axios from 'axios';

export default class Client {
  baseUrl = 'https://burppbackend.herokuapp.com/api/';
  // baseUrl = 'http://192.168.43.65:5000/api/';

  getRegisterRoute = () => 'users/register';

  getLoginRoute = () => 'users/login';

  getLogoutRoute = () => 'users/logout';

  getAuthRoute = () => 'users/auth';

  getNearRestaurantsRoute = () => 'filters/getRestaurants';

  getRestaurantRoute = () => 'restaurants/getRestaurants';

  getSendOrderCompletedRoute = () => 'filter/order/completeOrder';

  getPendingOrdersRoute = () =>
    'order/getPendingOrders/restaurant/:restaurantID';

  getRestaurantOrdersRoute = () => 'order/getOrders/restaurant/:restaurantID';

  getMyOrdersRoute = () => 'users/getOrders';

  getSendOrderRoute = () => 'order/postOrder_v2';

  getResendVerifiyEmailRoute = () => 'users/resend';

  getOrdersByUserRoute = () => 'users/getOrder';

  getCartRoute = () => 'cart';

  getRemoveCartItemRoute = () => 'cart/remove/:id';

  getAddCartItemRoute = () => 'cart/add/:id';

  getRestaurantMenuRoute = () => 'food_item/getFood_items';

  getPickUpRoute = () => 'order/completeOrder';

  doFetch = async (method, url, data = {}) => {
    console.log(`Client: fetching route ${this.baseUrl + url}`);
    try {
      const response = await axios({method, url: this.baseUrl + url, data});
      return response.data;
    } catch (error) {
      return error.response?.data || {error};
    }
  };

  register = async (email, name, lastname, password, image) => {
    const data = {
      email,
      name,
      lastname,
      password,
      image,
    };
    return this.doFetch('post', `${this.getRegisterRoute()}`, data);
  };

  login = async (email, password) => {
    const data = {
      email,
      password,
    };
    return this.doFetch('post', `${this.getLoginRoute()}`, data);
  };

  logout = async email => {
    const data = {
      email,
    };
    return this.doFetch('get', `${this.getLogoutRoute()}`, data);
  };

  getAuth = async () => this.doFetch('get', `${this.getAuthRoute()}`);

  sendVerificationEmail = async email => {
    const data = {
      email,
    };
    return this.doFetch('post', `${this.getResendVerifiyEmailRoute()}`, data);
  };

  getRestaurant = async restaurantId => {
    const data = {
      _id: restaurantId,
    };
    return this.doFetch('post', `${this.getRestaurantRoute()}`, data);
  };

  getNearRestaurants = async (
    latitude,
    longitude,
    filter = {status: true, rating: 0, category: 0},
  ) => {
    const data = {
      ...filter,
      latitude,
      longitude,
    };
    return this.doFetch('post', `${this.getNearRestaurantsRoute()}`, data);
  };

  getRestaurantMenu = async restaurantId => {
    const data = {
      restaurantID: restaurantId,
    };
    return this.doFetch('post', `${this.getRestaurantMenuRoute()}`, data);
  };

  sendOrderCompleted = async (order, restaurantId) => {
    const data = {};
    const result = await this.doFetch(
      'post',
      `${this.getSendOrderCompletedRoute()}`,
      data,
    );
    return result;
  };

  getPendingOrders = async restaurantId => {
    const data = {};
    const result = await this.doFetch(
      'get',
      `${this.getPendingOrdersRoute()}`,
      data,
    );
    return result;
  };

  getPastOrders = async userId => {
    const data = {
      userID: userId,
    };
    return this.doFetch('post', `${this.getMyOrdersRoute()}`, data);
  };

  getOrder = async orderId => {
    const data = {};
    const result = await this.doFetch('get', `${this.getOrderRoute()}`, data);
    return result;
  };

  sendOrder = async (userId, restaurant, cart, total) => {
    const data = {
      userID: userId,
      paymentMode: 'Cash On Delivery',
      completed: 'false',
      foodItems: {
        foodItemIds: Object.keys(cart.items),
        foodItemQtys: Object.values(cart.items),
      },
    };
    return this.doFetch('post', `${this.getSendOrderRoute()}`, data);
  };

  pickUpOrder = async orderId => {
    const data = {
      _id: orderId,
    };
    return this.doFetch('post', `${this.getPickUpRoute()}`, data);
  };

  getCart = async () => {
    const result = await this.doFetch('get', `${this.getCartRoute()}`, data);
    return result;
  };

  addCartItem = async () => {
    const result = await this.doFetch(
      'post',
      `${this.getAddCartItemRoute()}`,
      data,
    );
    return result;
  };

  removeCartItem = async () => {
    const result = await this.doFetch(
      'post',
      `${this.getRemoveCartItemRoute()}`,
      data,
    );
    return result;
  };
}
