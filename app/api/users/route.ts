import { NextResponse } from "next/server";

const STATUSES = ["active", "pending", "inactive", "suspended"] as const;
type UserStatus = (typeof STATUSES)[number];

function generateUsersForRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const usersByDay: Record<
    string,
    { id: string; name: string; status: UserStatus }[]
  > = {};

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateKey = d.toISOString().split("T")[0];
    const count = Math.floor(Math.random() * 10) + 1;
    usersByDay[dateKey] = [];

    for (let i = 0; i < count; i++) {
      usersByDay[dateKey].push({
        id: `${dateKey}-${i + 1}`,
        name: `User ${i + 1}`,
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      });
    }
  }

  return usersByDay;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start =
    searchParams.get("start") || new Date().toISOString().split("T")[0];
  const end = searchParams.get("end") || new Date().toISOString().split("T")[0];

  const data = generateUsersForRange(start, end);
  return NextResponse.json(data);
}
