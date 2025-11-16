"use client";

import React from "react";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import { useUsers } from "./hooks/useUsers";
import { Charts } from "../Charts";
import { useUserCharts } from "./hooks/useUserCharts";
import ChartSkeleton from "../Skeleton";

export const Users = () => {
  const { users, toolbarOptions, fetchUsers, statusFilter, setStatusFilter } =
    useUsers();
  const { startDate, endDate } = toolbarOptions;

  const chartData = useUserCharts({
    status: statusFilter,
    users,
  });

  return users?.length ? (
    <>
      <Toolbar
        {...toolbarOptions}
        fetch={() => fetchUsers(startDate, endDate)}
        filters={[
          {
            name: " Status",
            value: statusFilter,
            setValue: setStatusFilter,
            options: [
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Pending", value: "pending" },
              { label: "Inactive", value: "inactive" },
              { label: "Suspended", value: "suspended" },
            ],
          },
        ]}
      />

      <Charts
        {...chartData}
        titles={{ bar: "New Users", line: "New Users", pie: "Status" }}
        persianLabels={{
          active: "Active",
          inactive: "Inactive",
          pending: "Pending",
          suspended: "Suspended",
        }}
      />
    </>
  ) : (
    <ChartSkeleton />
  );
};
