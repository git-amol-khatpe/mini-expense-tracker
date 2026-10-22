export type TransactionType = 'income' | 'expense';

export type TransactionFilter = 'all' | 'income' | 'expense';

export interface Transaction {
  id: string;
  userId: number;
  title: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  notes?: string;
}