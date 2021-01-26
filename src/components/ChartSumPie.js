import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function ChartSumPie(props) {
  let data = [];
  let COLORS = [];

  props.readers_cumulative.forEach((reader) => {
    data.push({ reader: reader.reader, books: reader.books_read });
    COLORS.push(reader.color);
  });

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    reader,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="middle"
      >
        {`${reader.charAt(0)} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart width={220} height={220}>
      <Pie
        data={data}
        cx={100}
        cy={100}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#8884d8"
        dataKey="books"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
