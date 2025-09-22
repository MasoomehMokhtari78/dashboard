import { SystemReport } from "@/types";

type FilteredRequests = {
  date: string;
  type: string;
  status: string;
  count: number;
};

export const useCharts = ({
  reports,
  statusFilter,
  typeFilter,
}: {
  reports: SystemReport[];
  statusFilter: string;
  typeFilter: string;
}) => {
  const filtered: FilteredRequests[] = reports.flatMap((report) =>
    report.requests
      .filter(
        (req) =>
          (statusFilter === "all" || req.status === statusFilter) &&
          (typeFilter === "all" || req.type === typeFilter)
      )
      .map((req) => ({ ...req, date: report.date }))
  );

  const reportsByDate: Record<string, number> = {};
  filtered.forEach((report) => {
    reportsByDate[report.date] =
      (reportsByDate[report.date] || 0) + report.count;
  });

  const dates = Object.keys(reportsByDate);
  const counts = Object.values(reportsByDate);

  const pieCounts = filtered.reduce<Record<string, number>>((acc, request) => {
    const key = `${request.type} - ${request.status}`;
    acc[key] = (acc[key] || 0) + request.count;
    return acc;
  }, {});

  return { dates, counts, pieData: pieCounts };
};
