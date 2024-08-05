export type Transaction = {
  id: string;
  amount: number;
  text: string;
  userId: string | null;
  createdAt: Date;
};
