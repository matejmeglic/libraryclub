import React from "react";
import Typography from "@material-ui/core/Typography";
import ChartReadersBar from "./ChartReadersBar";
import MonthGoalGrid from "./MonthGoalGrid";

export default function ReaderCard(props) {
  const warning_color =
    props.reader_info.time_since_last < 9
      ? "textSecondary"
      : props.reader_info.time_since_last < 15
      ? "#FFA500"
      : "#FF4C4C";
  const font_weight = props.reader_info.time_since_last < 15 ? "" : 700;

  return (
    <React.Fragment>
      <Typography
        style={{
          color: props.reader_info.color,
        }}
        variant="h6"
      >
        {props.reader_info.reader}
      </Typography>
      <Typography component="p" variant="h4">
        {props.reader_info.books_read} knjig
      </Typography>
      <br />
      <span color="textSecondary">
        AVG: {props.reader_info.time_avg} dni | MIN:{" "}
        {props.reader_info.time_min} dni | MAX: {props.reader_info.time_max} dni
      </span>
      <span style={{ color: warning_color, fontWeight: font_weight }}>
        Od zadnje knjige je preteklo: {props.reader_info.time_since_last} dni
      </span>
      <br />
      <ChartReadersBar
        reader={props.reader_info.reader}
        color={props.reader_info.color}
        books_per_reader_month={props.reader_info.books_per_reader_month}
      />
      {props.goals.goal_per_month === true ? (
        <MonthGoalGrid
          goals={props.goals}
          books_array={props.reader_info.books_per_reader_month_array}
          color={props.reader_info.color}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
