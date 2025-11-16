import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Button } from "../ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "../ui/Input";
import { format } from "date-fns";
import { StepType } from "./useToolbar";
import { FilterConfig } from "@/types";

type Props = {
  step: StepType;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
  shift: (direction: "back" | "forward") => void;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  fetch: (start?: string, end?: string) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters?: FilterConfig<any>[];
};

export const Toolbar = ({
  step,
  setStep,
  shift,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  fetch,
  filters,
}: Props) => {
  const today = new Date();
  return (
    <div className="flex gap-2 items-center flex-wrap justify-center flex-col md:flex-row">
      <Select value={step} onValueChange={(val) => setStep(val as StepType)}>
        <SelectTrigger className="w-[300px] md:w-fit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
          <SelectItem value="year">Year</SelectItem>
        </SelectContent>
      </Select>

      {filters?.map((filter) => (
        <Select
          key={filter.name}
          value={filter.value}
          onValueChange={(v) => filter.setValue(v)}
        >
          <SelectTrigger className="w-[300px] md:w-fit">
            <SelectValue placeholder={`Filter by ${filter.name}`} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
      <div className="flex gap-2 flex-wrap flex-col md:flex-row">
        <Button
          onClick={() => shift("back")}
          className="px-2 py-1 hidden md:block"
          variant="outline"
        >
          <ChevronLeft />
        </Button>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-[300px] md:w-fit"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-[300px] md:w-fit"
        />
        <Button
          onClick={() => shift("forward")}
          className="px-2 py-1 hidden md:block"
          variant="outline"
          disabled={endDate === format(today, "yyyy-MM-dd")}
        >
          <ChevronRight />
        </Button>
        <Button onClick={() => fetch(startDate, endDate)}>Fetch</Button>
      </div>
    </div>
  );
};
