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
            name: " وضعیت",
            value: statusFilter,
            setValue: setStatusFilter,
            options: [
              { label: "همه", value: "all" },
              { label: "فعال", value: "active" },
              { label: "در انتظار تایید", value: "pending" },
              { label: "غیرفعال", value: "inactive" },
              { label: "مسدود شده", value: "suspended" },
            ],
          },
        ]}
      />
      {users?.length ? (
        <Charts
          {...chartData}
          titles={{ bar: "کاربر جدید", line: "کاربر جدید", pie: "وضعیت" }}
          persianLabels={{
            active: "فعال",
            inactive: "غیرفعال",
            pending: "در انتظار تایید",
            suspended: "مسدود شده",
          }}
        />
      ) : (
        <>Loading</>
      )}
    </>
  );
};
