import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "fontsource-roboto";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import "./index.css";
import App from "./App";
import drinksReducer from "./store/reducers/drinksReducer";
import foodReducer from "./store/reducers/foodReducer";
import ordersReducer from "./store/reducers/ordersReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  drinks: drinksReducer,
  food: foodReducer,
  orders: ordersReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

const app = (
  <Provider store={store}>
    <Router basename="/">
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
