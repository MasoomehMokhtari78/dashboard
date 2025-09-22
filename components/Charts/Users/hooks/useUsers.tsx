import { useToolbar } from "@/components/Toolbar/useToolbar";
import { getCachedData, setCachedData } from "@/lib/db";
import { format, subDays } from "date-fns";
import { useCallback, useEffect, useState } from "react";

type UserStatus = "active" | "pending" | "inactive" | "suspended";
type UserData = {
  date: string;
  status: UserStatus;
  id: string;
  name: string;
};

const processData = (
  rawData: Record<string, { id: string; name: string; status: UserStatus }[]>
): UserData[] => {
  return Object.entries(rawData).flatMap(([date, list]) =>
    list.map((u) => ({ ...u, date }))
  );
};

export const useUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");

  const fetchUsers = useCallback(async (start: string, end: string) => {
    const cacheKey = `users_${start}_${end}`;
    const cached = await getCachedData<{ data: UserData[] }>("users", cacheKey);
    if (cached) {
      setUsers(cached.data);
    } else {
      const response = await fetch(`/api/users?start=${start}&end=${end}`);
      const rawData = await response.json();
      const processed = processData(rawData);
      setUsers(processed);
      await setCachedData("users", cacheKey, processed);
    }
  }, []);

  const toolbarOptions = useToolbar({ fetch: fetchUsers });

  useEffect(() => {
    fetchUsers(
      format(new Date(), "yyyy-MM-dd"),
      format(subDays(new Date(), -30), "yyyy-MM-dd")
    );
  }, [fetchUsers]);
  return {
    users,
    toolbarOptions,
    fetchUsers,
    statusFilter,
    setStatusFilter,
  };
};
