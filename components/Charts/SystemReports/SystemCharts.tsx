"use client";

import { PieColorParams, PIECOLORS, SystemReport } from "@/types";
import EChartsReactCore, { EChartsReactProps } from "echarts-for-react";

const EChartsReact = EChartsReactCore as unknown as React.FC<EChartsReactProps>;

type FilteredRequests = {
  date: string;
  type: string;
  status: string;
  count: number;
};

export default function SystemCharts({
  reports,
  statusFilter,
  typeFilter,
}: {
  reports: SystemReport[];
  statusFilter: string;
  typeFilter: string;
}) {
  if (!reports.length) return <div>Loading...</div>;

  const filtered: FilteredRequests[] = reports.flatMap((report) =>
    report.requests
      .filter(
        (req) =>
          (statusFilter === "all" || req.status === statusFilter) &&
          (typeFilter === "all" || req.type === typeFilter)
      )
      .map((req) => ({ ...req, date: report.date }))
  );

  const reportsByDate: Record<string, number> = {};
  filtered.forEach((report) => {
    reportsByDate[report.date] =
      (reportsByDate[report.date] || 0) + report.count;
  });

  const dates = Object.keys(reportsByDate);
  const counts = Object.values(reportsByDate);

  const pieCounts = filtered.reduce<Record<string, number>>((acc, request) => {
    const key = `${request.type} - ${request.status}`;
    acc[key] = (acc[key] || 0) + request.count;
    return acc;
  }, {});

  const pieSeries = Object.entries(pieCounts).map(([name, value]) => ({
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
}
