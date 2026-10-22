import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Transaction } from '../../../shared/models/transaction.model';
import { CreateTransactionDto } from '../../../shared/models/create-transaction.dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly http = inject(HttpClient)
  private readonly apiUrl = `${environment.apiBaseUrl}/transactions`;
  constructor() { }

  getTransactions(): Observable<Transaction[]>{
    console.log('TransactionService.getTransactions called');
    return this.http.get<Transaction[]>(this.apiUrl)
  }

  createTransaction(transaction: CreateTransactionDto): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl,transaction);
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  updateTransaction(id: string,transaction: CreateTransactionDto): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.apiUrl}/${id}`,transaction);
  }

  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
