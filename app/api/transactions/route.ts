import { NextResponse } from "next/server";

const TYPES = ["pending", "verified", "failed"];

function generateTransactionsForRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const transactions = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    transactions.push({
      id: transactions.length + 1,
      type: TYPES[Math.floor(Math.random() * TYPES.length)],
      amount: Math.floor(Math.random() * 1000) + 100,
      date: d.toISOString().split("T")[0],
    });
  }

  return transactions;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start =
    searchParams.get("start") || new Date().toISOString().split("T")[0];
  const end = searchParams.get("end") || new Date().toISOString().split("T")[0];

  const data = generateTransactionsForRange(start, end);

  return NextResponse.json(data);
}
