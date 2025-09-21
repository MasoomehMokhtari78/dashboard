"use client";

import React from "react";
import EChartsReact from "echarts-for-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function TransactionsCharts({
  transactions,
}: {
  transactions: any[];
}) {
  if (!transactions.length) return <div>Loading...</div>;

  const amountByDate: Record<string, number> = {};
  transactions.forEach((t) => {
    amountByDate[t.date] = (amountByDate[t.date] || 0) + t.amount;
  });

  const dates = Object.keys(amountByDate).sort();
  const totalAmounts = dates.map((d) => amountByDate[d]);

  // Aggregate data for Pie chart
  const pieData = Object.entries(
    transactions.reduce((acc, t) => {
      acc[t.type] = (acc[t.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const barLineOption = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: dates },
    yAxis: { type: "value" },
    dataZoom: [{ type: "slider", start: 0, end: 100, bottom: 0 }],

    series: [
      { name: "Total Amount", type: "bar", data: totalAmounts },
      { name: "Total Amount", type: "line", data: totalAmounts },
    ],
  };

  const pieOption = {
    tooltip: { trigger: "item" },
    legend: { bottom: 0 },
    series: [
      {
        name: "Transaction Types",
        type: "pie",
        radius: "50%",
        data: pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.5)",
          },
        },
        label: { formatter: "{b}: {c}" },
        itemStyle: {
          color: (params: any) => COLORS[params.dataIndex % COLORS.length],
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-12 items-center">
      <EChartsReact
        option={barLineOption}
        style={{ width: 800, height: 400 }}
      />
      <EChartsReact option={pieOption} style={{ width: 400, height: 400 }} />
    </div>
  );
}
