"use client";

import React, { useState, useEffect, useCallback } from "react";
import TransactionsCharts from "./TransactionChart";
import { addDays, format, isAfter, subDays } from "date-fns";
import { getCachedData, setCachedData } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { ChevronLeft, ChevronRight } from "lucide-react";

type StepType = "week" | "month" | "year";

const stepDurations: Record<StepType, number> = {
  week: 7,
  month: 30,
  year: 365,
};

export const Transactions = () => {
  const today = new Date();
  const [step, setStep] = useState<StepType>("month");
  const [duration, setDuration] = useState(stepDurations["month"]);
  const [startDate, setStartDate] = useState(
    format(addDays(today, -30), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(format(today, "yyyy-MM-dd"));
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

  useEffect(() => {
    const newDuration = stepDurations[step];
    setDuration(newDuration);
    setStartDate(format(subDays(today, newDuration), "yyyy-MM-dd"));
    setEndDate(format(today, "yyyy-MM-dd"));
    fetchData(
      format(subDays(today, newDuration), "yyyy-MM-dd"),
      format(today, "yyyy-MM-dd")
    );
  }, [step]);

  const handleDateRangeChange = (newStart: string, newEnd: string) => {
    setStartDate(newStart);
    setEndDate(newEnd);
    fetchData(newStart, newEnd);
  };

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

      <TransactionsCharts transactions={transactions} />
    </div>
  );
};
