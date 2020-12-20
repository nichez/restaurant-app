import axios from "axios";

import { prices } from '../../prices';
import * as actionTypes from "./actionTypes";

export const fetchDrinksStart = () => {
  return {
    type: actionTypes.FETCH_DRINKS_START,
  };
};

export const fetchDrinksSuccess = (drinks) => {
  return {
    type: actionTypes.FETCH_DRINKS_SUCCESS,
    drinks: drinks,
  };
};

export const fetchDrinksFail = (error) => {
  return {
    type: actionTypes.FETCH_DRINKS_FAIL,
    error: error,
  };
};

export const fetchDrinks = () => {
  return (dispatch) => {
    dispatch(fetchDrinksStart());

    let url =
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";
    axios
      .get(url)
      .then((response) => {
        const data = response.data.drinks.map((item, index) => {
          return {...item, price: prices[index], items: 1}
        })
        dispatch(fetchDrinksSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchDrinksFail());
      });
  };
};