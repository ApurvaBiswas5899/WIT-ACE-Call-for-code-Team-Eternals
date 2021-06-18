import { USER } from "../utils/user";

const initialState = {
  loginSuccess: false,
  registerSuccess: false,
  authSuccess: false,
  logoutSuccess: false,
  _id: "",
  email: "",
  password: "",
  name: "",
  lastname: "",
  dateOfBirth: "",
  gender: "",
  contactNo: "",
  role: 0,
  error: "",
  isAuth: false,
  isAdmin: false,
  isVerified: false,
  burppcred: 0,

  orders: [],
  // [   Don't remove
  //   {
  //     foodItems: {
  //       foodItemIds: [
  //         "602789fd69d6be5b49c92783",
  //         "602786a269d6be5b49c92781"
  //       ],
  //       foodItemQtys: [
  //         10,
  //         1
  //       ]
  //     },
  //     total: 800,
  //     completed: false,
  //     _id: "60278fc11de47e67b9928da2",
  //     userID: "600034db4fcbb762cc969575",
  //     restaurantID: "6020d2d218692f00156116bb",
  //     paymentMode: "COD",
  //     paymentSuccess: "false",
  //     consumedFood: "No",
  //     created: "2021-02-13T08:37:21.797Z",
  //     __v: 0
  //   },    RestaurantName, Images also inc
  // ]
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER.login:
      return {
        ...state,
        _id: action.data._id,
        email: action.data.email,
        name: action.data.name,
        lastname: action.data.lastname,
        role: action.data.role,
        dateOfBirth: action.data.dateOfBirth,
        gender: action.data.gender,
        contactNo: action.data.contactNo,
        isVerified: action.data.isVerified,
        burppcred: action.data.burppcred,
        loginSuccess: true,
      };

    case USER.googleLogin:
      console.log('action.data', action.data)
      return {
        ...state,
        _id: action.data.userId,
        email: action.data.email,
        name: action.data.name,
        lastname: action.data.lastname,
        role: 'user',
        dateOfBirth: null,
        gender: null,
        contactNo: action.data.contactNo,
        isVerified: action.data.isVerified,
        burppcred: null,
        loginSuccess: true,
        registerSuccess: true,
        authSuccess: true,
        isAuth: true,
      };

    case USER.register:
      return { ...state, registerSuccess: true };

    case USER.auth:
      return {
        ...state,
        isAuth: action.data.isAuth,
        _id: action.data._id,
        isAdmin: action.data.isAdmin,
        isAuth: action.data.isAuth,
        email: action.data.email,
        name: action.data.name,
        lastname: action.data.lastname,
        role: action.data.role,
        dateOfBirth: action.data.dateOfBirth,
        gender: action.data.gender,
        contactNo: action.data.contactNo,
      };

    case USER.updateUserInfo:
      return {
        ...state,
        name: action.data.name,
        email: action.data.email,
      };
    case USER.emailVerify:
      return { ...state };

    case USER.getOrder:
      return { ...state, orders: action.data };

    case USER.getPendingOrder:
      console.log(action, "action");
      return {
        ...state,
        PendingOrder: action.response,
      };

    default:
      return state;
  }
}
