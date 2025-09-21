import { NextResponse } from "next/server";

const TYPES = ["pending", "verified", "failed"];
type TransactionType = (typeof TYPES)[number];

function generateTransactionsForRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const transactionsByDay: Record<
    string,
    { id: string; type: TransactionType; amount: number }[]
  > = {};

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateKey = d.toISOString().split("T")[0];
    const count = Math.floor(Math.random() * 5) + 1;
    transactionsByDay[dateKey] = [];

    for (let i = 0; i < count; i++) {
      transactionsByDay[dateKey].push({
        id: `${dateKey}-${i + 1}`,
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        amount: Math.floor(Math.random() * 1000) + 100,
      });
    }
  }

  return transactionsByDay;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start =
    searchParams.get("start") || new Date().toISOString().split("T")[0];
  const end = searchParams.get("end") || new Date().toISOString().split("T")[0];

  const data = generateTransactionsForRange(start, end);

  return NextResponse.json(data);
}
