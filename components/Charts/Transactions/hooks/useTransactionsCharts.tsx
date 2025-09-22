import { TransactionType } from "@/types";

export const useTransactionsCharts = ({
  transactions,
  mode,
}: {
  transactions: TransactionType;
  mode: "total" | "max";
}) => {
  const dates = transactions.map((t) => t.date);
  const amounts = transactions.map((t) => (mode === "total" ? t.total : t.max));

  const pieData = transactions.reduce((acc, t) => {
    t.types.forEach((type) => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return { dates, counts: amounts, pieData };
};
