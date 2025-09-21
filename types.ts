export type TransactionType = {
  date: string;
  types: string[];
  total: number;
  max: number;
}[];

export type UserStatus = "active" | "pending" | "inactive" | "suspended";
export type User = {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  createdAt: string;
};
