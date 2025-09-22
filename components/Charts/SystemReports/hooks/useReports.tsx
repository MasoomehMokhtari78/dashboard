import { useToolbar } from "@/components/Toolbar/useToolbar";
import { getCachedData, setCachedData } from "@/lib/db";
import { format, subDays } from "date-fns";
import { useCallback, useEffect, useState } from "react";

type RequestStatus = "success" | "fail";
type RequestType = "login" | "payment" | "fetchData";

type ReportData = {
  date: string;
  requests: { type: RequestType; status: RequestStatus; count: number }[];
};

export const useReports = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">(
    "all"
  );
  const [typeFilter, setTypeFilter] = useState<RequestType | "all">("all");

  const fetchReports = useCallback(async (start: string, end: string) => {
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
  }, []);

  const toolbarOptions = useToolbar({ fetch: fetchReports });

  useEffect(() => {
    fetchReports(
      format(new Date(), "yyyy-MM-dd"),
      format(subDays(new Date(), -30), "yyyy-MM-dd")
    );
  }, []);
  return {
    reports,
    toolbarOptions,
    fetchReports,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
  };
};
