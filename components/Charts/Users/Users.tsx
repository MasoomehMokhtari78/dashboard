"use client";

import React from "react";
import UsersCharts from "./UsersChart";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import { useUsers } from "./useUsers";

export const Users = () => {
  const { users, toolbarOptions, fetchUsers, statusFilter, setStatusFilter } =
    useUsers();
  const { startDate, endDate } = toolbarOptions;

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
      <UsersCharts users={users} status={statusFilter} />
    </>
  );
};
