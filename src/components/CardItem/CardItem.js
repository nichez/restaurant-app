import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const CardItem = (props) => {
  const classes = useStyles();
  const { drink } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={drink.strDrinkThumb}
          title={drink.strDrink}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {drink.strDrink}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Description id {drink.idDrink}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Typography gutterBottom>{drink.price} MKD</Typography>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          className={classes.margin}
          onClick={props.addOrder}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: 20,
  },
  media: {
    height: 140,
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "space-between",
    padding: 10,
  },
}));

export default CardItem;
