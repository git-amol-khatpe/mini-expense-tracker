import { TransactionType } from './transaction.model';

export interface CreateTransactionDto {
  userId: number;
  title: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  notes?: string;
}