"use client";

import React from "react";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import { useReports } from "./hooks/useReports";
import { Charts } from "../Charts";
import { useCharts } from "./hooks/useSystemCharts";
import ChartSkeleton from "../Skeleton";

export const SystemReports = () => {
  const {
    reports,
    toolbarOptions,
    fetchReports,
    statusFilter,
    typeFilter,
    filters,
  } = useReports();
  const { startDate, endDate } = toolbarOptions;
  const chartData = useCharts({
    reports,
    statusFilter,
    typeFilter,
  });

  return reports?.length > 0 ? (
    <>
      <Toolbar
        {...toolbarOptions}
        fetch={() => fetchReports(startDate, endDate)}
        filters={filters}
      />

      <Charts
        {...chartData}
        titles={{ bar: "Requests", line: "Requests", pie: "Request status" }}
        persianLabels={{
          "payment - fail": "payment - fail",
          "payment - success": "payment - success",
          "login - fail": "login - fail",
          "login - success": "login - success",
          "fetchData - fail": "fetchData - fail",
          "fetchData - success": "fetchData - success",
        }}
      />
    </>
  ) : (
    <ChartSkeleton />
  );
};
