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

type FilterOption = { label: string; value: string };

type FilterConfig = {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<FilterOption[]>>;
  options: FilterOption[];
};

type Props = {
  step: StepType;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
  shift: (direction: "back" | "forward") => void;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  fetch: (start?: string, end?: string) => Promise<void>;
  filters?: FilterConfig[];
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
    <div className="flex gap-2 items-center">
      <Select value={step} onValueChange={(val) => setStep(val as StepType)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">هفته</SelectItem>
          <SelectItem value="month">ماه</SelectItem>
          <SelectItem value="year">سال</SelectItem>
        </SelectContent>
      </Select>

      {filters?.map((filter) => (
        <Select
          key={filter.name}
          value={filter.value}
          onValueChange={(v) => filter.setValue(v)}
        >
          <SelectTrigger className="w-[140px]">
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

      <Button
        onClick={() => shift("back")}
        className="px-2 py-1"
        variant="outline"
      >
        <ChevronRight />
      </Button>
      <Input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <Input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Button
        onClick={() => shift("forward")}
        className="px-2 py-1"
        variant="outline"
        disabled={endDate === format(today, "yyyy-MM-dd")}
      >
        <ChevronLeft />
      </Button>
      <Button onClick={() => fetch(startDate, endDate)}>بروزرسانی</Button>
    </div>
  );
};
