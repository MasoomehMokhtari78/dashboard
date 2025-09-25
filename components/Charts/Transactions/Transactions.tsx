"use client";

import React from "react";
import { useTransactions } from "./hooks/useTransactions";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import { Charts } from "../Charts";
import { useTransactionsCharts } from "./hooks/useTransactionsCharts";
import ChartSkeleton from "../Skeleton";

export const Transactions = () => {
  const { transactions, toolbarOptions, fetchTransactions, mode, setMode } =
    useTransactions();
  const { startDate, endDate } = toolbarOptions;

  const chartData = useTransactionsCharts({
    transactions,
    mode,
  });

  return transactions?.length > 0 ? (
    <>
      <Toolbar
        {...toolbarOptions}
        fetch={() => fetchTransactions(startDate, endDate)}
        filters={[
          {
            name: "reportType",
            value: mode,
            setValue: setMode,
            options: [
              { label: "Max", value: "max" },
              { label: "Total", value: "total" },
            ],
          },
        ]}
      />

      <Charts
        {...chartData}
        titles={{
          bar: "Transactions per day",
          line: "Transactions per day",
          pie: "Transaction Status",
        }}
        persianLabels={{
          pending: "Pending",
          failed: "Failed",
          verified: "Verified",
        }}
      />
    </>
  ) : (
    <ChartSkeleton />
  );
};
