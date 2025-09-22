import { Skeleton } from "@/components/ui/Skeleton";

export default function ChartSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Skeleton className="h-10 w-24 rounded" />
        <Skeleton className="h-10 w-24 rounded" />
        <Skeleton className="h-10 w-40 md:w-64 rounded bg-zinc-700" />
        <Skeleton className="h-10 w-24 rounded" />
      </div>

      <div className="flex flex-col gap-6 items-center">
        <Skeleton className="h-64 w-full rounded" />
        <Skeleton className="h-64 w-full rounded" />
        <Skeleton className="h-64 w-64 rounded-full md:col-span-2" />
      </div>
    </div>
  );
}
