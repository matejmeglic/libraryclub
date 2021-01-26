import React from "react";
import { BarChart, Bar, Tooltip, XAxis, YAxis } from "recharts";

export default function ChartReadersBar(props) {
  return (
    <BarChart
      width={200}
      height={150}
      data={props.books_per_reader_month}
      margin={{
        top: 10,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <XAxis dataKey="month" tick={false} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="Knjige" fill={props.color} />
    </BarChart>
  );
}
