import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import LocalBarIcon from "@material-ui/icons/LocalBar";

const drawerWidth = 240;

const Sidebar = (props) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <NavLink to="/food" className={classes.link}>
            <ListItem button key={1} selected={location.pathname === "/food"}>
              <ListItemIcon>
                <LocalDiningIcon />
              </ListItemIcon>
              <ListItemText primary="Food" />
            </ListItem>
          </NavLink>
          <Divider variant="middle" />
          <NavLink to="/main" className={classes.link}>
            <ListItem button key={2} selected={location.pathname === "/main"}>
              <ListItemIcon>
                <LocalBarIcon />
              </ListItemIcon>
              <ListItemText primary={"Cocktails"} />
            </ListItem>
          </NavLink>
          <Divider variant="middle" />
        </List>
      </div>
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

export default Sidebar;
