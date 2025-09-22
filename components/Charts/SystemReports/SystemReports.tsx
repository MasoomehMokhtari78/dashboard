"use client";

import React from "react";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import { useReports } from "./hooks/useReports";
import { Charts } from "../Charts";
import { useCharts } from "./hooks/useSystemCharts";

export const SystemReports = () => {
  const {
    reports,
    toolbarOptions,
    fetchReports,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
  } = useReports();
  const { startDate, endDate } = toolbarOptions;

  const chartData = useCharts({
    reports,
    statusFilter,
    typeFilter,
  });

  return (
    <>
      <Toolbar
        {...toolbarOptions}
        fetch={() => fetchReports(startDate, endDate)}
        filters={[
          {
            name: "status",
            value: statusFilter,
            setValue: setStatusFilter,
            options: [
              { label: "All", value: "all" },
              { label: "Success", value: "success" },
              { label: "Fail", value: "fail" },
            ],
          },
          {
            name: "reportType",
            value: typeFilter,
            setValue: setTypeFilter,
            options: [
              { label: "All", value: "all" },
              { label: "Login", value: "login" },
              { label: "Payment", value: "payment" },
              { label: "Fetch Data", value: "fetchData" },
            ],
          },
        ]}
      />
      {reports ? <Charts {...chartData} /> : <>Loading</>}
    </>
  );
};
