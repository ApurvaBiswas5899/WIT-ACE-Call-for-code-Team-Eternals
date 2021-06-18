import { client, order } from '../../client';
import { USER } from '../../utils/user';

export function registerUser(
  email,
  password,
  name,
  lastname,
  dateOfBirth,
  gender,
  contactNo
) {
  return async (dispatch) => {
    const result = await client.register(
      email,
      password,
      name,
      lastname,
      dateOfBirth,
      gender,
      contactNo
    );

    // console.log(result);

    if (result.error) {
      if (result.error.response.data.message) {
        return {
          error: result.error.response.data.message, // Existing email
        };
      }
      return {
        error: 'Invalid Email', // result.error.response.data.msg // No recipients ( Email Missing '@' )
      };
    }

    if (result.success == false) {
      return {
        error: 'Password must be atleast of 5 letters', // result.data.err.errors.password
      };
    }

    if (result) {
      dispatch({
        type: USER.register,
      });
      return {
        success: true,
        result: result,
      };
    }
  };
}

export function loginUser(email, password) {
  return async (dispatch) => {
    const result = await client.login(email, password);

    if (result?.type) {
      return {
        success: false,
        error: result.msg,
      };
    }

    if (result.loginSuccess) {
      dispatch({
        type: USER.login,
        data: result.user,
      });
      return { success: true };
    }

    return {
      success: false,
      error: result.message,
    };
  };
}

export function googleLogin(data) {
  console.log(data, 'google data');
  return (dispatch) => {
    dispatch({
      type: USER.googleLogin,
      data: data,
    });
  };
}

export function getAuth() {
  return async (dispatch) => {
    const result = await client.getAuth();

    // console.log(result); // User is login, still getting error. But Working properly on postman

    if (result.isAuth) {
      dispatch({
        type: USER.auth,
        data: result,
      });

      return { success: true };
    } else {
      return {
        sucess: false,
        error: result.error, // true
      };
    }
  };
}

export function logout() {
  return async (dispatch) => {
    const result = await client.logout();

    if (result.success) {
      dispatch({
        type: USER.logout,
      });

      return { success: true };
    }

    return {
      sucess: false,
      error: result.err,
    };
  };
}

export function emailVerify(email, password) {
  return async (dispatch) => {
    const result = await client.emailVerify(email, password);

    if (result.error) {
      return {
        success: false,
        message: result.error.response.data.msg,
      };
    }

    dispatch({
      type: USER.emailVerify,
    });
    return {
      success: true,
      result: result,
    };
  };
}

export function getOrder(userID) {
  return async (dispatch) => {
    const result = await client.getOrder(userID);

    console.log('past result', result);

    if (result.success) {
      let completedOrder = result.orders.filter(
        (order) => order.completed === true
      );

      console.log('filtered', completedOrder);

      const mainSize = completedOrder.length;

      const mainArray = new Array(mainSize).fill([]);

      completedOrder.map((singleOrder, mainIndex) => {
        const response = singleOrder.foodItems;

        var n = response.foodItemIds.length;

        var dataArray = [];

        var dataToDispatch = singleOrder;

        for (let i = 0; i < n; i++) {
          let emptyObj = {
            _id: null,
            qty: null,
            totalPrice: null,
            name: null,
            images: null,
          };
          dataArray.push(emptyObj);
        }

        response.foodItemIds.map((id, index) => {
          dataArray[index]._id = id;
        });

        response.foodItemQtys.map((qty, index) => {
          dataArray[index].qty = qty;
        });

        response.foodItemPrices.map((price, index) => {
          dataArray[index].totalPrice = price;
        });

        response.foodItemNames.map((name, index) => {
          dataArray[index].name = name;
        });

        response.foodItemImages.map((image, index) => {
          dataArray[index].images = image;
        });

        dataToDispatch.foodItems = dataArray;

        mainArray[mainIndex] = dataToDispatch;
      });

      console.log('mainarray', mainArray);

      dispatch({
        type: USER.getOrder,
        data: mainArray,
      });

      return {
        success: true,
        response: completedOrder,
      };
    }

    return { success: false, error: result };
  };
}

export function getPendingOrder(userID) {
  return async (dispatch) => {
    const result = await order.getCurrentOrder(userID);
    const pending = [];
    console.log('result view', result);
    result.map((order) => {
      if (typeof order === 'object') {
        if (
          (order.paymentMode === 'Cash On Delivery' &&
            order.completed === false) ||
          (order.paymentSuccess === 'Completed' &&
            order.paymentMode === 'razorpay' &&
            order.completed === false)
        ) {
          pending.unshift(order);
        }
      }
    });
    console.log(pending, 'pending');
    const r = [];
    pending.map((item) => {
      const food = item.foodItems;
      const n = item.foodItems.foodItemIds.length;
      const rr = [];
      for (let i = 0; i < n; i++) {
        const init = {
          foodItemIds: null,
          oodItemImages: null,
          foodItemNames: null,
          foodItemPrices: null,
          foodItemQtys: null,
        };
        rr.push(init);
      }
      food.foodItemIds.map((id, idx) => {
        rr[idx].foodItemIds = id;
      });

      food.foodItemImages.map((img, idx) => {
        rr[idx].foodItemImages = img;
      });

      food.foodItemNames.map((name, idx) => {
        rr[idx].foodItemNames = name;
      });

      food.foodItemPrices.map((price, idx) => {
        rr[idx].foodItemPrices = price;
      });

      food.foodItemQtys.map((qty, idx) => {
        rr[idx].foodItemQtys = qty;
      });

      r.push(rr);
    });

    pending.map((item, idx) => {
      item.foodItems = r[idx];
    });

    console.log(pending, 'pending');

    dispatch({
      type: USER.getPendingOrder,
      response: pending,
    });
    return {
      success: true,
      response: pending,
    };
  };
}

export function updateUserInfo(email, name) {
  const res = {
    email,
    name,
  };

  return async (dispatch) => {
    dispatch({
      type: USER.updateUserInfo,
      data: res,
    });
  };
}
