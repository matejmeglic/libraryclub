import React from "react";
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

  // readers lines
  for (var j = 0; j < props.readers_cumulative.length; j++) {
    readers.push([
      props.readers_cumulative[j].reader,
      [props.readers_cumulative[j].color],
    ]);
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

  if (props.goals.goal_per_month === true) {
    list.push(
      <Line
        type="monotone"
        strokeWidth={1}
        dataKey={"Mesečni cilj"}
        stroke={"#d4d4d4"}
        dot={false}
      />
    );
  }

  list.push(
    <Line
      type="monotone"
      strokeWidth={5}
      dataKey={"Skupaj"}
      stroke={"#3f51b5"}
      dot={false}
    />
  );

  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(!showResults);

  return (
    <React.Fragment style={{ height: "400px" }}>
      <Title>
        Prebrane knjige{"   "}
        {props.goals.goal_per_season === true ? (
          <Button
            variant="contained"
            width={100}
            style={{ marginLeft: "10px" }}
            onClick={onClick}
          >
            Cilj sezone
          </Button>
        ) : (
          ""
        )}
      </Title>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={400}
          data={props.books_daily}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Label />
          {list}
          {showResults ? (
            <Line
              type="monotone"
              strokeWidth={4}
              dataKey={"Cilj sezone"}
              stroke={"#82ffa1"}
              dot={false}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
