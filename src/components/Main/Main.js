import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import CardItem from "../CardItem/CardItem";
import * as actions from "../../store/actions/index";
import CustomDialog from "../CustomDialog/CustomDialog";

const Main = (props) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  let drinks = null;

  const { onFetchDrinks } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    onFetchDrinks();
  }, []);

  const handleChange = (value) => {
    setSearch(value);
  };

  if (props.drinks !== null) {
    drinks = props.drinks
      .filter(
        (item) =>
          item.strDrink.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
      .map((drink, index) => {
        return (
          <Grid item sm={12} md={3} key={drink.idDrink}>
            <CardItem
              drink={drink}
              addOrder={
                props.selectedTable
                  ? () => props.onAddOrderDrink(drink)
                  : () => handleClickOpen()
              }
            />
          </Grid>
        );
      });
  }

  const FormRow = () => {
    return (
      <React.Fragment>
        <Grid container>{drinks}</Grid>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.content}>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        title="Select a table"
        description="To add an order please select a table on the right sidebar."
        buttonText="Okay"
      />
      <form className={classes.searchContainer} noValidate autoComplete="off">
        <TextField
          id="search-filter-drinks"
          label="Search Drinks"
          fullWidth
          value={search}
          onChange={(e) => handleChange(e.target.value)}
        />
      </form>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 60,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    marginBottom: "30px",
  },
}));

const mapStateToProps = (state) => {
  return {
    drinks: state.drinks.drinks,
    loading: state.drinks.loading,
    error: state.drinks.error,
    orders: state.orders.orders,
    selectedTable: state.orders.selectedTable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDrinks: () => dispatch(actions.fetchDrinks()),
    onAddOrderDrink: (drink) => dispatch(actions.addOrderDrink(drink)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
