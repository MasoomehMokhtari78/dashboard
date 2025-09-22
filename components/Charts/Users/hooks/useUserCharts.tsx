type User = {
  date: string;
  id: string;
  name: string;
  status: string;
};

export const useUserCharts = ({
  users,
  status,
}: {
  users: User[];
  status: string;
}) => {
  const filteredUsers =
    status === "all" ? users : users.filter((user) => user.status === status);

  const usersByDate: Record<string, User[]> = {};
  filteredUsers.forEach((u) => {
    if (!usersByDate[u.date]) usersByDate[u.date] = [];
    usersByDate[u.date].push(u);
  });

  const dates = Object.keys(usersByDate).sort();
  const counts = dates.map((d) => usersByDate[d].length);

  const statusCounts = users.reduce<Record<string, number>>((acc, u) => {
    acc[u.status] = (acc[u.status] || 0) + 1;
    return acc;
  }, {});
  return { dates, counts, pieData: statusCounts };
};
