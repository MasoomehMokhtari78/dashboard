import { faker } from "@faker-js/faker";

export type Transaction = {
  id: number;
  user: string;
  amount: number;
  ts: string;
  type: "buy" | "sell";
};

let transactions: Transaction[] = [];

export function generateTransactions(count = 2000) {
  const start = Date.now() - 1000 * 60 * 60 * 24 * 30;
  transactions = Array.from({ length: count }, (_, i) => ({
    id: i,
    user: faker.internet.username(),
    amount: Number(faker.finance.amount({ min: 10, max: 5000 })),
    ts: new Date(start + i * 60000).toISOString(),
    type: faker.helpers.arrayElement(["buy", "sell"]),
  }));
  return transactions;
}

export function fetchTransactions({ start, end }: { start: Date; end: Date }) {
  return transactions.filter(
    (t) => new Date(t.ts) >= start && new Date(t.ts) <= end
  );
}
