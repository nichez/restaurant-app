import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Add from "@material-ui/icons/Add";

const GridTables = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={1}>
          {props.tables.map((value) => (
            <Grid key={value} item>
              <Paper
                className={classes.paper}
                children={<p>{value}</p>}
                onClick={() => props.onSelect(value)}
              />
            </Grid>
          ))}
          <Grid key={'last'} item>
              <Paper
                className={classes.paper}
                children={<Add />}
                onClick={() => props.onAddTable()}
              />
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    marginLeft: 'auto'
  },
  paper: {
    height: 70,
    width: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.5",
      fontSize: 20,
      color: "black",
    },
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default GridTables;
