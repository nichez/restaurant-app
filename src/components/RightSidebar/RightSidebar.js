import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBack from "@material-ui/icons/ArrowBack";
import * as actions from "../../store/actions/index";
import GridTables from "./GridTables";
import Paper from "@material-ui/core/Paper";

const drawerWidth = 310;

const RightSidebar = (props) => {
  const classes = useStyles();
  let total = 0;
  let totalItems = 0;

  console.log("RIGHTSIDE orders ", props.orders);
  console.log("RIGHTSIDE selectedTable ", props.selectedTable);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
    >
      <Toolbar />
      <div className={classes.tableOrder}>
        {!props.selectedTable ? (
          <div className={classes.gridContainer}>
            <p className={classes.selectTableLabel}>Select a table</p>
            <GridTables
              onSelect={(table) => props.onSelectedTable(table)}
              onAddTable={() => props.onAddTable()}
              tables={props.tables}
            />
          </div>
        ) : (
          <Paper className={classes.paper}>
            <IconButton
              className={classes.arrowBack}
              edge="start"
              aria-label="backButton"
              onClick={() => props.onUnselectedTable()}
            >
              <ArrowBack />
            </IconButton>

            <div className={classes.paperRight}>
              <p>Selected Table: </p>
              <p className={classes.tableValue}>{props.selectedTable}</p>
            </div>
          </Paper>
        )}
      </div>
      <div className={classes.drawerContainer}>
        <List>
          {props.orders.length > 0 &&
            props.orders.map((order) => {
              let numItems = order.items > 1 ? "x" + order.items : "";

              totalItems += order.items;

              if (order.items > 1) {
                let multipliedPrice = +order.price * +order.items;
                total += +multipliedPrice;
              } else {
                total += +order.price;
              }

              return (
                <ListItem
                  key={order.idDrink ? order.idDrink : order.idCategory}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={
                        order.strDrinkThumb
                          ? order.strDrinkThumb
                          : order.strCategoryThumb
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      order.strDrink ? order.strDrink : order.strCategory
                    }
                    secondary={`${order.price * order.items} MKD ${numItems}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={
                        order.idDrink
                          ? () => props.onRemoveOrderDrink(order.idDrink)
                          : () => props.onRemoveOrderFood(order.idCategory)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
        <Divider variant="middle" />
        {props.selectedTable && (
          <List className={classes.totalContainer}>
            <ListItem button key={1} className={classes.totalWrapper}>
              <ListItemText
                primary={"Total"}
                secondary={`${totalItems} items`}
              />
              <ListItemText
                primary={`${total.toFixed(2)} MKD`}
                className={classes.price}
              />
            </ListItem>
          </List>
        )}
      </div>
      {props.selectedTable && (
        <Button
          disabled={props.orders.length === 0}
          variant="contained"
          color="primary"
          className={classes.printButton}
          onClick={() => alert(`Price ${total} MKD`)}
        >
          Print
        </Button>
      )}
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
  totalWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  price: {
    marginLeft: 110,
  },
  printButton: {
    margin: 15,
  },
  tableOrder: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 15,
    marginRight: 15,
  },
  gridContainer: {
    // margin: 'auto'
  },
  selectTableLabel: {
    fontSize: 18,
  },
  paper: {
    height: 60,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
  paperRight: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    fontSize: 18,
  },
  tableValue: {
    marginLeft: 10,
  },
  arrowBack: {
    marginLeft: 1,
  },
}));

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    selectedTable: state.orders.selectedTable,
    tables: state.orders.tables,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveOrderDrink: (id) => dispatch(actions.removeOrderDrink(id)),
    onRemoveOrderFood: (id) => dispatch(actions.removeOrderFood(id)),
    onSelectedTable: (table) => dispatch(actions.selectedTable(table)),
    onUnselectedTable: () => dispatch(actions.unselectedTable()),
    onAddTable: () => dispatch(actions.addTable()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
