import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import FoodItem from "./FoodItem";
import * as actions from "../../store/actions/index";
import CustomDialog from "../CustomDialog/CustomDialog";

const Food = (props) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  let food = null;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { onFetchFood } = props;

  useEffect(() => {
    onFetchFood();
  }, []);

  const handleChange = (value) => {
    setSearch(value);
  };

  console.log("FOOD JS table ", props.selectedTable);

  if (props.food !== null) {
    food = props.food
      .filter(
        (item) =>
          item.strCategory.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
      .map((item, index) => {
        return (
          <Grid item sm={12} md={3} key={item.idCategory}>
            <FoodItem
              foodItem={item}
              addOrder={
                props.selectedTable
                  ? () => props.onAddOrderFood(item)
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
        <Grid container>{food}</Grid>
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
          id="search-filter-food"
          label="Search Food"
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
  searchContainer: {
    marginBottom: "30px",
  },
}));

const mapStateToProps = (state) => {
  return {
    food: state.food.food,
    loading: state.food.loading,
    error: state.food.error,
    selectedTable: state.orders.selectedTable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchFood: () => dispatch(actions.fetchFood()),
    onAddOrderFood: (item) => dispatch(actions.addOrderFood(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Food);
