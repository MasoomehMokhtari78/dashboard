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

export type RequestType = "login" | "payment" | "fetchData";
export type RequestStatus = "success" | "fail";

export type SystemReport = {
  date: string;
  requests: {
    type: RequestType;
    status: RequestStatus;
    count: number;
  }[];
};

export const PIECOLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF4444"];
export type PieColorParams = {
  dataIndex: number;
  name?: string;
  value?: number;
};
