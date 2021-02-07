import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import Title from "./Title";

export default function Chart(props) {
  let readers = [];
  let list = [];
  let season_lines = [];

  // readers lines
  for (var j = 0; j < props.readers.length; j++) {
    readers.push([props.readers[j].reader, [props.readers[j].color]]);
  }

  readers
    .sort()
    .reverse()
    .forEach((item) => {
      list.unshift(
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey={item[0]}
          stroke={item[1]}
          dot={false}
        />
      );
    });

  if (props.monthy === true) {
    if (props.goals.goal_per_month === true) {
      list.push(
        <Line
          type="monotone"
          strokeWidth={props.monthly_gray[2]}
          dataKey={props.monthly_gray[0]}
          stroke={props.monthly_gray[1]}
          dot={false}
        />
      );
    }
  }

  props.season_lines.forEach((line) =>
    season_lines.push(
      <Line
        type="monotone"
        strokeWidth={line[2]}
        dataKey={line[0]}
        stroke={line[1]}
        dot={false}
      />
    )
  );

  // hack for state
  let rstate;
  if (props.show_season_lines === false) {
    rstate = false;
  } else {
    rstate = { showResults: true };
  }

  const [showResults, setShowResults] = React.useState(rstate);
  const onClick = () => setShowResults(!showResults);

  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 900 && showLegend) {
        setShowLegend(false);
      } else if (window.innerWidth >= 900 && showLegend === false) {
        setShowLegend(true);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showLegend]);

  return (
    <React.Fragment>
      <Title>
        {props.title}
        {"   "}
        {props.button === true ? (
          <Button
            variant="contained"
            width={100}
            style={{ marginLeft: "10px" }}
            onClick={onClick}
          >
            {props.button_text}
          </Button>
        ) : (
          ""
        )}
      </Title>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={showLegend ? 300 : 350}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey={props.dataKey} />
          <YAxis />
          <Tooltip />
          {showLegend ? <Legend /> : ""}
          <Label />
          {list}
          {showResults ? season_lines : null}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
