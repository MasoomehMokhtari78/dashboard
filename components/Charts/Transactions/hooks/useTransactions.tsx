import { useToolbar } from "@/components/Toolbar/useToolbar";
import { getCachedData, setCachedData } from "@/lib/db";
import { TransactionType } from "@/types";
import { format, subDays } from "date-fns";
import { useCallback, useEffect, useState } from "react";

const processData = (
  rawData: Record<string, { type: string; amount: number }[]>
) => {
  return Object.entries(rawData).map(([date, info]) => {
    const types = info.map((t) => t.type);
    const total = info.reduce((sum, t) => sum + t.amount, 0);
    const max = Math.max(...info.map((t) => t.amount));
    return { date, types, total, max };
  });
};

export const useTransactions = () => {
  const [mode, setMode] = useState<"total" | "max">("total");
  const [transactions, setTransactions] = useState<TransactionType>([]);

  const fetchTransactions = useCallback(async (start: string, end: string) => {
    const cacheKey = `transactions_${start}_${end}`;
    const cached = await getCachedData<{ data: TransactionType }>(
      "transactions",
      cacheKey
    );
    if (cached) {
      setTransactions(cached.data);
    } else {
      const response = await fetch(
        `/api/transactions?start=${start}&end=${end}`
      );
      const rawData = await response.json();
      const processed = processData(rawData);
      setTransactions(processed);
      await setCachedData("transactions", cacheKey, processed);
    }
  }, []);
  const toolbarOptions = useToolbar({ fetch: fetchTransactions });

  useEffect(() => {
    fetchTransactions(
      format(new Date(), "yyyy-MM-dd"),
      format(subDays(new Date(), -30), "yyyy-MM-dd")
    );
  }, [fetchTransactions]);

  return {
    transactions,
    toolbarOptions,
    fetchTransactions,
    mode,
    setMode,
  };
};
