import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function ReaderCard(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{props.reader_info.reader}</Title>
      <Typography component="p" variant="h4">
        {props.reader_info.books_read} knjig
      </Typography>
      <Typography color="textSecondary" variant="h6">
        Podatki o branju:
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Povprečje: {props.reader_info.time_avg} dni
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Najhitreje: {props.reader_info.time_min} dni
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Najpočasneje: {props.reader_info.time_max} dni
      </Typography>
    </React.Fragment>
  );
}
