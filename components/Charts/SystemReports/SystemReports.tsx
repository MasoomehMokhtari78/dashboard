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
        titles={{ bar: "درخواست", line: "درخواست", pie: "وضعیت درخواست" }}
        persianLabels={{
          "payment - fail": "پرداخت ناموفق",
          "payment - success": "پرداخت موفق",
          "login - fail": "ورود ناموفق",
          "login - success": "ورود موفق",
          "fetchData - fail": "درخواست داده ناموفق",
          "fetchData - success": "درخواست داده موفق",
        }}
      />
    </>
  ) : (
    <ChartSkeleton />
  );
};
