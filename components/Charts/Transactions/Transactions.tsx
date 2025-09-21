"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import TransactionsCharts from "./TransactionChart";
import { addDays, format, isAfter, subDays } from "date-fns";
import { getCachedData, setCachedData } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TransactionType } from "@/types";

type StepType = "week" | "month" | "year";

const stepDurations: Record<StepType, number> = {
  week: 7,
  month: 30,
  year: 365,
};

export const Transactions = () => {
  const today = useMemo(() => new Date(), []);
  const [mode, setMode] = useState<"total" | "max">("total");
  const [step, setStep] = useState<StepType>("month");
  const [duration, setDuration] = useState(stepDurations["month"]);
  const [startDate, setStartDate] = useState(
    format(subDays(today, stepDurations["month"]), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(format(today, "yyyy-MM-dd"));
  const [transactions, setTransactions] = useState<TransactionType>([]);

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

  const fetchData = useCallback(
    async (start = startDate, end = endDate) => {
      const cacheKey = `transactions_${start}_${end}`;
      const cached = await getCachedData(cacheKey);
      if (cached) {
        setTransactions(cached.data);
      } else {
        const response = await fetch(
          `/api/transactions?start=${start}&end=${end}`
        );
        const rawData = await response.json();
        const processed = processData(rawData);
        setTransactions(processed);
        await setCachedData(cacheKey, processed);
      }
    },
    [startDate, endDate]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDateRangeChange = useCallback(
    (newStart: string, newEnd: string) => {
      setStartDate(newStart);
      setEndDate(newEnd);
      fetchData(newStart, newEnd);
    },
    [fetchData]
  );

  useEffect(() => {
    const newDuration = stepDurations[step];
    setDuration(newDuration);
    const newStart = format(subDays(today, newDuration), "yyyy-MM-dd");
    const newEnd = format(today, "yyyy-MM-dd");
    handleDateRangeChange(newStart, newEnd);
  }, [step, handleDateRangeChange, today]);

  const shift = (direction: "back" | "forward") => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const newStart =
      direction === "back"
        ? subDays(start, duration)
        : addDays(start, duration);
    const newEnd =
      direction === "back" ? subDays(end, duration) : addDays(end, duration);

    if (isAfter(newEnd, today)) return;

    handleDateRangeChange(
      format(newStart, "yyyy-MM-dd"),
      format(newEnd, "yyyy-MM-dd")
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-2xl font-bold">Transactions Dashboard</h1>
      <div className="flex gap-2 items-center">
        <Select
          value={mode}
          onValueChange={(val) => setMode(val as "total" | "max")}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="total">Total</SelectItem>
            <SelectItem value="max">Max</SelectItem>
          </SelectContent>
        </Select>
        <Select value={step} onValueChange={(val) => setStep(val as StepType)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={() => shift("back")}
          className="px-2 py-1"
          variant="outline"
        >
          <ChevronRight />
        </Button>

        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <Button
          onClick={() => shift("forward")}
          className="px-2 py-1"
          disabled={endDate === format(today, "yyyy-MM-dd")}
          variant="outline"
        >
          <ChevronLeft />
        </Button>

        <Button onClick={() => fetchData(startDate, endDate)}>Fetch</Button>
      </div>

      <TransactionsCharts transactions={transactions} mode={mode} />
    </div>
  );
};
