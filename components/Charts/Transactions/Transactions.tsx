"use client";

import React, { useState, useEffect, useCallback } from "react";
import TransactionsCharts from "./TransactionChart";
import { addDays, format } from "date-fns";
import { getCachedData, setCachedData } from "@/lib/db";

export const Transactions = () => {
  const [startDate, setStartDate] = useState(
    format(addDays(new Date(), -7), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchData = useCallback(async (start = startDate, end = endDate) => {
    const cacheKey = `transactions_${start}_${end}`;
    const cached = await getCachedData(cacheKey);
    if (cached) {
      setTransactions(cached.data);
    } else {
      const response = await fetch(
        `/api/transactions?start=${start}&end=${end}`
      );
      const data = await response.json();
      setTransactions(data);
      await setCachedData(cacheKey, data);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-2xl font-bold">Transactions Dashboard</h1>

      <div className="flex gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={() => fetchData(startDate, endDate)}
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          Fetch
        </button>
      </div>

      <TransactionsCharts transactions={transactions} />
    </div>
  );
};
