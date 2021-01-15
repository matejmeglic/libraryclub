import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();

  let sum = 0;
  props.readers_cumulative.map((item) => (sum += item.books_read));

  return (
    <React.Fragment>
      <Title>Prebranih</Title>
      <Typography component="p" variant="h4">
        {sum} knjig
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        do {props.today}
      </Typography>
    </React.Fragment>
  );
}
