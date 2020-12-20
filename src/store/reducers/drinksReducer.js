import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  drinks: null,
  error: null,
  loading: false,
};

const fetchDrinksStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const fetchDrinksSuccess = (state, action) => {
  return updateObject(state, {
    drinks: action.drinks,
    error: null,
    loading: false,
  });
};

const fetchDrinksFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const drinksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DRINKS_START:
      return fetchDrinksStart(state, action);
    case actionTypes.FETCH_DRINKS_SUCCESS:
      return fetchDrinksSuccess(state, action);
    case actionTypes.FETCH_DRINKS_FAIL:
      return fetchDrinksFail(state, action);
    default:
      return state;
  }
};

export default drinksReducer;
