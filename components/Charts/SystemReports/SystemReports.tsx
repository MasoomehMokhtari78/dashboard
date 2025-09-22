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
              { label: "همه", value: "all" },
              { label: "موفق", value: "success" },
              { label: "ناموفق", value: "fail" },
            ],
          },
          {
            name: "reportType",
            value: typeFilter,
            setValue: setTypeFilter,
            options: [
              { label: "همه", value: "all" },
              { label: "ورود", value: "login" },
              { label: "پرداخت", value: "payment" },
              { label: "درخواست داده", value: "fetchData" },
            ],
          },
        ]}
      />
      {reports ? (
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
      ) : (
        <>Loading</>
      )}
    </>
  );
};
