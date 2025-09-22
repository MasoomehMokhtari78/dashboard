import { PieColorParams, PIECOLORS } from "@/types";
import React from "react";

import EChartsReactCore, { EChartsReactProps } from "echarts-for-react";

const EChartsReact = EChartsReactCore as unknown as React.FC<EChartsReactProps>;

type Props = {
  pieData: Record<string, number>;
  dates: string[];
  counts: number[];
};

export const Charts = ({ dates, counts, pieData }: Props) => {
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
        name: "Requests per Day",
        type: "bar",
        data: counts,
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
        name: "Requests per Day",
        type: "line",
        data: counts,
      },
    ],
  };

  const pieOption = {
    tooltip: { trigger: "item" },
    legend: { bottom: 0 },
    series: [
      {
        name: "Request Type & Status",
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
            PIECOLORS[params.dataIndex % PIECOLORS.length],
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
};
