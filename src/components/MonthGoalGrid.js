import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    "grid-template-columns": "1fr 1fr 1fr",
    "grid-gap": "5px",
  },
  monthGoal: {
    width: "100%",
    height: "0%",
    "text-align": "center",
  },
  colorSuccess: {
    color: "#82ffa1",
    width: "100%",
    height: "0%",
    "text-align": "center",
  },
});

export default function MonthGoalGrid(props) {
  const classes = useStyles();

  let grid = [];
  for (let i = 0; i < props.books_array.length; i++) {
    let color =
      props.books_array[i] >= props.goals.goal_per_month_no ? props.color : "";
    let weight =
      props.books_array[i] >= props.goals.goal_per_month_no ? 700 : "";
    grid.push(
      <div
        className={classes.monthGoal}
        style={{ color: color, fontWeight: weight }}
      >
        {props.goals.season_months_names[i]}
      </div>
    );
  }

  return (
    <React.Fragment>
      <div
        className={classes.grid}
        style={{ "grid-template-rows": props.goals.goal_per_month_css }}
      >
        {grid}
      </div>
    </React.Fragment>
  );
}
