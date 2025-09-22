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
              { label: "بیشترین مبلغ", value: "max" },
              { label: "جمع مبالغ", value: "total" },
            ],
          },
        ]}
      />

      <Charts
        {...chartData}
        titles={{
          bar: "مقدار تراکنش در روز",
          line: "مقدار تراکنش در روز",
          pie: "وضعیت تراکنش",
        }}
        persianLabels={{
          pending: "در انتظار تایید",
          failed: "ناموفق",
          verified: "موفق",
        }}
      />
    </>
  ) : (
    <ChartSkeleton />
  );
};
