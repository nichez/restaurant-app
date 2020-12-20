import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  error: null,
  loading: false,
  selectedTable: false,
  tables: [1, 2, 3, 4, 5, 6],
};

// Add order for Drinks
const addOrderDrink = (state, action) => {
  let currentIndex;
  let updatedState;
  let item = action.order;

  const found = state.orders.some((el, index) => {
    if (el.idDrink === item.idDrink) {
      currentIndex = index;
    }
    return el.idDrink === item.idDrink;
  });

  if (found) {
    item = { ...action.order, items: ++item.items };
    updatedState = [...state.orders, (state.orders[currentIndex] = item)];
    return {
      ...state,
      orders: [...state.orders],
      [state.orders[currentIndex]]: item,
    };
  } else {
    const updatedItem = {
      ...item,
      uniqueId:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    };

    updatedState = [...state.orders, updatedItem];

    return updateObject(state, {
      orders: updatedState,
    });
  }
};

const removeOrderDrink = (state, action) => {
  return updateObject(state, {
    orders: state.orders.filter((item) => item.idDrink !== action.id),
    error: null,
    loading: false,
  });
};

// Add order for Food
const addOrderFood = (state, action) => {
  let currentIndex;
  let item = action.order;

  const found = state.orders.some((el, index) => {
    if (el.idCategory === item.idCategory) {
      currentIndex = index;
    }
    return el.idCategory === item.idCategory;
  });

  let updatedState;

  if (found) {
    item = { ...action.order, items: ++item.items };
    updatedState = [...state.orders, (state.orders[currentIndex] = item)];
    return updateObject(state, {
      orders: [...state.orders],
      [state.orders[currentIndex]]: item
    });
  } else {
    const updatedItem = {
      ...item,
      uniqueId:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    };

    updatedState = [...state.orders, updatedItem];

    return updateObject(state, {
      orders: updatedState,
    });
  }
};

const removeOrderFood = (state, action) => {
  return updateObject(state, {
    orders: state.orders.filter((item) => item.idCategory !== action.id),
    error: null,
    loading: false,
  });
};

const selectedTable = (state, action) => {
  return updateObject(state, {
    selectedTable: action.table,
  });
};

const unselectedTable = (state, action) => {
  return updateObject(state, {
    selectedTable: null,
  });
};

const addTable = (state, action) => {
  return updateObject(state, {
    tables: [...state.tables, state.tables[state.tables.length - 1] + 1],
  });
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER_DRINK:
      return addOrderDrink(state, action);
    case actionTypes.REMOVE_ORDER_DRINK:
      return removeOrderDrink(state, action);
    case actionTypes.ADD_ORDER_FOOD:
      return addOrderFood(state, action);
    case actionTypes.REMOVE_ORDER_FOOD:
      return removeOrderFood(state, action);
    case actionTypes.SELECTED_TABLE:
      return selectedTable(state, action);
    case actionTypes.UNSELECTED_TABLE:
      return unselectedTable(state, action);
    case actionTypes.ADD_TABLE:
      return addTable(state, action);
    default:
      return state;
  }
};

export default ordersReducer;
