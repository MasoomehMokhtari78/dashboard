import { NextResponse } from "next/server";

const TYPES = ["pending", "verified", "failed"];

function generateTransactions(count = 100) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    type: TYPES[Math.floor(Math.random() * TYPES.length)],
    amount: Math.floor(Math.random() * 1000) + 100,
    date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
  }));
}

export async function GET() {
  // simulate delay
  await new Promise((res) => setTimeout(res, 1000));

  const data = generateTransactions();
  return NextResponse.json(data);
}
