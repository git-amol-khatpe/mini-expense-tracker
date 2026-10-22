import { Component, inject, signal } from '@angular/core';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
import { CreateTransactionDto } from '../../../../shared/models/create-transaction.dto';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [TransactionFormComponent],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.scss'
})
export class CreateTransactionComponent {
  private readonly transactionService = inject(TransactionService);

  private readonly router = inject(Router);

  readonly saving = signal(false);

  save(transaction: CreateTransactionDto): void {
    this.saving.set(true);
    this.transactionService.createTransaction({
        ...transaction,userId: 2
      })
      .pipe(
        catchError(() => {
          return of(null);
        }),
        finalize(() => {
          this.saving.set(false);
        })
      )
      .subscribe(result => {

        if (!result) {
          return;
        }

        void this.router.navigate([
          '/transactions'
        ]);
      });
  }
}
