"use client";

import { TransactionType } from "@/types";
import EChartsReactCore, { EChartsReactProps } from "echarts-for-react";

const EChartsReact = EChartsReactCore as unknown as React.FC<EChartsReactProps>;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
type PieColorParams = {
  dataIndex: number;
  name?: string;
  value?: number;
};

export default function TransactionsCharts({
  transactions,
  mode,
}: {
  transactions: TransactionType;
  mode: "total" | "max";
}) {
  if (!transactions.length) return <div>Loading...</div>;

  const dates = transactions.map((t) => t.date);
  const amounts = transactions.map((t) => (mode === "total" ? t.total : t.max));

  const pieData = transactions.reduce((acc, t) => {
    t.types.forEach((type) => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const pieSeries = Object.entries(pieData).map(([name, value]) => ({
    name,
    value,
  }));

  const barOption = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: dates },
    yAxis: { type: "value" },
    dataZoom: [{ type: "slider", start: 0, end: 100, bottom: 0 }],
    series: [
      {
        name: mode === "total" ? "Total Amount" : "Max Amount",
        type: "bar",
        data: amounts,
      },
    ],
  };

  const lineOption = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: dates },
    yAxis: { type: "value" },
    dataZoom: [{ type: "slider", start: 0, end: 100, bottom: 0 }],
    series: [
      {
        name: mode === "total" ? "Total Amount" : "Max Amount",
        type: "line",
        data: amounts,
      },
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
        data: pieSeries,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.5)",
          },
        },
        label: { formatter: "{b}: {c}" },
        itemStyle: {
          color: (params: PieColorParams) =>
            COLORS[params.dataIndex % COLORS.length],
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <EChartsReact option={barOption} style={{ width: 800, height: 400 }} />
      <EChartsReact option={lineOption} style={{ width: 800, height: 400 }} />
      <EChartsReact option={pieOption} style={{ width: 400, height: 400 }} />
    </div>
  );
}
