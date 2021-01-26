import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import ChartSumPie from "./ChartSumPie";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function TotalTeam(props) {
  const classes = useStyles();

  let sum_books = 0;
  let sum_pages = 0;
  props.readers_cumulative.map((item) => (sum_books += item.books_read));
  props.readers_cumulative.map((item) => (sum_pages += item.pages_read));

  return (
    <React.Fragment>
      <Title>
        Do{" "}
        {props.today < props.goals.season_end
          ? props.today
          : props.goals.season_end}{" "}
        smo prebrali
      </Title>
      <Typography component="p" variant="h5">
        {sum_books} knjig, {sum_pages} strani
      </Typography>
      {props.goals.goal_per_season === true ? (
        <Typography color="textSecondary" className={classes.depositContext}>
          od zastavljenih {props.goals.goal_per_season_no} knjig
        </Typography>
      ) : (
        ""
      )}{" "}
      <ChartSumPie readers_cumulative={props.readers_cumulative} />
    </React.Fragment>
  );
}
