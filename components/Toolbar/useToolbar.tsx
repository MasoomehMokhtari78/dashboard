import { useCallback, useEffect, useMemo, useState } from "react";
import { addDays, format, isAfter, subDays } from "date-fns";

export type StepType = "week" | "month" | "year";
const stepDurations: Record<StepType, number> = {
  week: 7,
  month: 30,
  year: 365,
};

type Props = {
  fetch: (start: string, end: string) => Promise<void>;
};

export const useToolbar = ({ fetch }: Props) => {
  const today = useMemo(() => new Date(), []);

  const [endDate, setEndDate] = useState(format(today, "yyyy-MM-dd"));
  const [startDate, setStartDate] = useState(
    format(subDays(today, stepDurations["month"]), "yyyy-MM-dd")
  );

  const [step, setStep] = useState<StepType>("month");
  const [duration, setDuration] = useState(stepDurations["month"]);
  const handleDateRangeChange = useCallback(
    (newStart: string, newEnd: string) => {
      setStartDate(newStart);
      setEndDate(newEnd);
      fetch(newStart, newEnd);
    },
    [fetch]
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
  return { step, setStep, shift, startDate, setStartDate, endDate, setEndDate };
};
