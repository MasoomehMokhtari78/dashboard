"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function TransactionsCharts({
  transactions,
}: {
  transactions: any[];
}) {

  const pieData = Object.entries(
    transactions.reduce((acc, t) => {
      acc[t.type] = (acc[t.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([type, count]) => ({ type, count }));

  const amountByDate = transactions.reduce((acc, t) => {
    acc[t.date] = (acc[t.date] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const lineBarData = Object.entries(amountByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, totalAmount]) => ({ date, totalAmount }));

  return (
    <div className="flex flex-col gap-12 items-center">
      <div className="flex flex-wrap justify-center gap-8">
        <BarChart width={500} height={300} data={lineBarData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalAmount" fill="#8884d8" />
        </BarChart>

        <LineChart width={500} height={300} data={lineBarData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalAmount" stroke="#82ca9d" />
        </LineChart>

        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            dataKey="count"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
