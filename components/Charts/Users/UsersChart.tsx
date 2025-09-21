"use client";

import EChartsReactCore, { EChartsReactProps } from "echarts-for-react";

const EChartsReact = EChartsReactCore as unknown as React.FC<EChartsReactProps>;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF4444"];
type PieColorParams = {
  dataIndex: number;
  name?: string;
  value?: number;
};

type User = {
  date: string;
  id: string;
  name: string;
  status: string;
};

export default function UsersCharts({
  users,
  status,
}: {
  users: User[];
  status: string;
}) {
  if (!users.length) return <div>Loading...</div>;

  const filteredUsers =
    status === "all" ? users : users.filter((u) => u.status === status);

  const usersByDate: Record<string, User[]> = {};
  filteredUsers.forEach((u) => {
    if (!usersByDate[u.date]) usersByDate[u.date] = [];
    usersByDate[u.date].push(u);
  });

  const dates = Object.keys(usersByDate).sort();
  const counts = dates.map((d) => usersByDate[d].length);

  const statusCounts = users.reduce<Record<string, number>>((acc, u) => {
    acc[u.status] = (acc[u.status] || 0) + 1;
    return acc;
  }, {});

  const pieSeries = Object.entries(statusCounts).map(([name, value]) => ({
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
        name: "Users per Day",
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
        name: "Users per Day",
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
        name: "User Statuses",
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
