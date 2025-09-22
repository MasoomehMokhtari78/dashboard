"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { addDays, format, isAfter, subDays } from "date-fns";
import { getCachedData, setCachedData } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/Select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SystemCharts from "./SystemCharts";

type StepType = "week" | "month" | "year";

const stepDurations: Record<StepType, number> = {
  week: 7,
  month: 30,
  year: 365,
};

type RequestStatus = "success" | "fail";
type RequestType = "login" | "payment" | "fetchData";

type ReportData = {
  date: string;
  requests: { type: RequestType; status: RequestStatus; count: number }[];
};

export const SystemReports = () => {
  const today = useMemo(() => new Date(), []);
  const [step, setStep] = useState<StepType>("month");
  const [duration, setDuration] = useState(stepDurations["month"]);
  const [startDate, setStartDate] = useState(
    format(subDays(today, stepDurations["month"]), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(format(today, "yyyy-MM-dd"));
  const [reports, setReports] = useState<ReportData[]>([]);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">(
    "all"
  );
  const [typeFilter, setTypeFilter] = useState<RequestType | "all">("all");

  const fetchReports = useCallback(
    async (start = startDate, end = endDate) => {
      const cacheKey = `reports_${start}_${end}`;
      const cached = await getCachedData("systemReports", cacheKey);
      if (cached) {
        setReports(cached.data);
      } else {
        const response = await fetch(
          `/api/system-reports?start=${start}&end=${end}`
        );
        const data: ReportData[] = await response.json();
        setReports(data);
        await setCachedData("systemReports", cacheKey, data);
      }
    },
    [startDate, endDate]
  );

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleDateRangeChange = useCallback(
    (newStart: string, newEnd: string) => {
      setStartDate(newStart);
      setEndDate(newEnd);
      fetchReports(newStart, newEnd);
    },
    [fetchReports]
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
      <h1 className="text-2xl font-bold">System Reports</h1>
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

        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as RequestStatus | "all")}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="fail">Fail</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v as RequestType | "all")}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="fetchData">Fetch Data</SelectItem>
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
          variant="outline"
          disabled={endDate === format(today, "yyyy-MM-dd")}
        >
          <ChevronLeft />
        </Button>
        <Button onClick={() => fetchReports(startDate, endDate)}>Fetch</Button>
      </div>

      <SystemCharts
        reports={reports}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
      />
    </div>
  );
};
