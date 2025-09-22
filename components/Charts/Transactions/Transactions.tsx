"use client";

import React from "react";
import TransactionsCharts from "./TransactionChart";

import { useTransactions } from "./useTransactions";
import { Toolbar } from "@/components/Toolbar/Toolbar";

export const Transactions = () => {
  const { transactions, toolbarOptions, fetchTransactions, mode, setMode } =
    useTransactions();
  const { startDate, endDate } = toolbarOptions;
  return (
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

      <TransactionsCharts transactions={transactions} mode={mode} />
    </>
  );
};
