export interface ITasks {
  uuid: string;
  title: string;
  description: string;
  status: "COMPLETED" | "PENDING";
}