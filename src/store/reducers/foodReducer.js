import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  food: null,
  error: null,
  loading: false,
};

const fetchFoodStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const fetchFoodSuccess = (state, action) => {
  return updateObject(state, {
    food: action.food,
    error: null,
    loading: false,
  });
};

const fetchFoodFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FOOD_START:
      return fetchFoodStart(state, action);
    case actionTypes.FETCH_FOOD_SUCCESS:
      return fetchFoodSuccess(state, action);
    case actionTypes.FETCH_FOOD_FAIL:
      return fetchFoodFail(state, action);
    default:
      return state;
  }
};

export default foodReducer;
