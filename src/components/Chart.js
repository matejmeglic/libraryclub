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
  let readers = [];

  // list all readers
  for (
    var j = 0;
    j < props.books_per_date[0]["reader_books_cumulative"].length;
    j++
  ) {
    readers.push(props.books_per_date[0]["reader_books_cumulative"][j][0]);
  }

  // order data object
  for (var i = 0; i < props.books_per_date.length; i++) {
    data.push({
      date: props.books_per_date[i].date,
      sum: props.books_per_date[i].sum,
      sum_cumulative: props.books_per_date[i].sum_cumulative,
    });
    // add readers_books to the data object
    for (var k = 0; k < readers.length; k++) {
      if (props.books_per_date[i].reader_books_cumulative[k][1] === 0) {
        data[i][readers[k]] = undefined;
      } else {
        data[i][readers[k]] =
          props.books_per_date[i].reader_books_cumulative[k][1];
      }
    }
  }

  console.log(data);
  console.log(readers);

  //set list
  let list = [];

  let count = 1;
  readers
    .sort()
    .reverse()
    .forEach((item) => {
      list.unshift(
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey={item}
          stroke={props.colors[count]}
        />
      );
      count++;
    });

  list.push(
    <Line
      type="monotone"
      strokeWidth={5}
      dataKey="sum_cumulative"
      stroke={props.colors[0]}
    />
  );

  return (
    <React.Fragment>
      <Title>Prebrane knjige</Title>
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
          {list}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
