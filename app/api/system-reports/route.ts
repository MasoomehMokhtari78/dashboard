import { RequestStatus, RequestType, SystemReport } from "@/types";
import { NextResponse } from "next/server";

const REQUEST_TYPES: RequestType[] = ["login", "payment", "fetchData"];
const REQUEST_STATUSES: RequestStatus[] = ["success", "fail"];

function generateReports(start: string, end: string): SystemReport[] {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const reports: SystemReport[] = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateKey = d.toISOString().split("T")[0];
    const requests = REQUEST_TYPES.flatMap((type) =>
      REQUEST_STATUSES.map((status) => ({
        type,
        status,
        count: Math.floor(Math.random() * 100),
      }))
    );

    reports.push({ date: dateKey, requests });
  }

  return reports;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start =
    searchParams.get("start") || new Date().toISOString().split("T")[0];
  const end = searchParams.get("end") || new Date().toISOString().split("T")[0];

  const data = generateReports(start, end);
  return NextResponse.json(data);
}
