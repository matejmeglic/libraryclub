import React from "react";

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
  let data = [];

  let count = 0;
  for (var i = 0; i < props.books_per_date.length; i++) {
    // var parts = props.books_per_date[i].date_read.split("-");
    // var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
    count += props.books_per_date[i].sum;

    data.push({
      date: props.books_per_date[i].date_read,
      value: count,
      reader: props.books_per_date[i].reader,
    });
  }

  return (
    <React.Fragment>
      <Title>Branje</Title>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={400}
          data={data}
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
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
