import axios from "axios";

import { prices } from '../../prices';
import * as actionTypes from "./actionTypes";

export const fetchFoodStart = () => {
  return {
    type: actionTypes.FETCH_FOOD_START,
  };
};

export const fetchFoodSuccess = (food) => {
  return {
    type: actionTypes.FETCH_FOOD_SUCCESS,
    food: food,
  };
};

export const fetchFoodFail = (error) => {
  return {
    type: actionTypes.FETCH_FOOD_FAIL,
    error: error,
  };
};

export const fetchFood = () => {
  return (dispatch) => {
    dispatch(fetchFoodStart());

    let url =
      "https://www.themealdb.com/api/json/v1/1/categories.php";
    axios
      .get(url)
      .then((response) => {
        const data = response.data.categories.map((item, index) => {
          return {...item, price: prices[index], items: 1}
        })
        dispatch(fetchFoodSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchFoodFail());
      });
  };
};