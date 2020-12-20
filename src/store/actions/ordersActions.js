import * as actionTypes from "./actionTypes";

// Add order
export const addOrderDrink = (order) => {
  return {
    type: actionTypes.ADD_ORDER_DRINK,
    order: order,
  };
};

// Remove order
export const removeOrderDrink = (id) => {
  return {
    type: actionTypes.REMOVE_ORDER_DRINK,
    id: id,
  };
};

// Add order for Food
export const addOrderFood = (order) => {
  return {
    type: actionTypes.ADD_ORDER_FOOD,
    order: order,
  };
};

export const removeOrderFood = (id) => {
  return {
    type: actionTypes.REMOVE_ORDER_FOOD,
    id: id,
  };
};

// Selected table
export const selectedTable = (table) => {
  return {
    type: actionTypes.SELECTED_TABLE,
    table: table,
  };
};

// Unselected table
export const unselectedTable = () => {
  return {
    type: actionTypes.UNSELECTED_TABLE,
  };
};

// Add & Remove Table
export const addTable = (table) => {
  return {
    type: actionTypes.ADD_TABLE,
  };
};

export const removeTable = (id) => {
  return {
    type: actionTypes.REMOVE_TABLE,
    id: id,
  };
};