import { PieColorParams, PIECOLORS } from "@/types";
import React from "react";

import EChartsReactCore, { EChartsReactProps } from "echarts-for-react";

const EChartsReact = EChartsReactCore as unknown as React.FC<EChartsReactProps>;

type Props = {
  pieData: Record<string, number>;
  dates: string[];
  counts: number[];
  titles?: { bar?: string; line?: string; pie?: string };
  persianLabels?: Record<string, string>;
};

export const Charts = ({
  dates,
  counts,
  pieData,
  titles,
  persianLabels,
}: Props) => {
  const pieSeries = Object.entries(pieData).map(([name, value]) => ({
    name: (persianLabels && persianLabels[name]) || name,
    value,
  }));

  const barOption = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: dates },
    yAxis: { type: "value" },
    dataZoom: [{ type: "slider", start: 0, end: 100, bottom: 0 }],
    series: [
      {
        name: titles?.bar,
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
        name: titles?.line,
        type: "line",
        data: counts,
      },
    ],
  };

  const pieOption = {
    tooltip: { trigger: "item" },
    legend: {
      bottom: 0,
      textStyle: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
        // fontFamily: "IranSans",
      },
    },
    series: [
      {
        name: titles?.pie,
        type: "pie",
        radius: "50%",
        data: pieSeries,
        label: {
          formatter: "{b}: {c}",
          color: "#FFFFFF",
          // fontFamily: "IRANSans",
          fontSize: 14,
        },
        itemStyle: {
          color: (params: PieColorParams) =>
            PIECOLORS[params.dataIndex % PIECOLORS.length],
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <EChartsReact
        option={barOption}
        style={{ width: "100%", maxWidth: "800px", height: 400 }}
      />
      <EChartsReact
        option={lineOption}
        style={{ width: "100%", maxWidth: "800px", height: 400 }}
      />
      <EChartsReact
        option={pieOption}
        style={{ width: "100%", maxWidth: "800px", height: 400 }}
      />
    </div>
  );
};
