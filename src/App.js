import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";

const Main = React.lazy(() => {
  return import("./components/Main/Main");
});

const Food = React.lazy(() => {
  return import("./components/Food/Food");
});

const Login = React.lazy(() => {
  return import("./containers/Login/Login");
});

function App() {
  const classes = useStyles();
  let routes = null;
  let isAuth = true;

  routes = (
    <Switch>
      <Route path="/main" render={(props) => <Main {...props} />}></Route>
      <Route path="/food" render={(props) => <Food {...props} />}></Route>
      <Route path="/login" render={(props) => <Login {...props} />}></Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      {isAuth && <Header />}
      {isAuth && <Sidebar />}
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      {isAuth && <RightSidebar />}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default withRouter(App);
