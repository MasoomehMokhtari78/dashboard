"use client";

import React from "react";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import { useUsers } from "./hooks/useUsers";
import { Charts } from "../Charts";
import { useUserCharts } from "./hooks/useUserCharts";

export const Users = () => {
  const { users, toolbarOptions, fetchUsers, statusFilter, setStatusFilter } =
    useUsers();
  const { startDate, endDate } = toolbarOptions;

  const chartData = useUserCharts({
    status: statusFilter,
    users,
  });

  return (
    <>
      <Toolbar
        {...toolbarOptions}
        fetch={() => fetchUsers(startDate, endDate)}
        filters={[
          {
            name: "status",
            value: statusFilter,
            setValue: setStatusFilter,
            options: [
              { label: "Active", value: "active" },
              { label: "Pending", value: "pending" },
              { label: "Inactive", value: "inactive" },
              { label: "Suspended", value: "suspended" },
            ],
          },
        ]}
      />
      {users?.length ? <Charts {...chartData} /> : <>Loading</>}
    </>
  );
};
