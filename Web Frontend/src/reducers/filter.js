import { FILTER } from "../utils/filter";

const initialState = {
  restaurants: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case FILTER.byCategory:
      return { ...state, restaurants: action.data.restaurants };
    default:
      return state;
  }
}
