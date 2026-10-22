import {ChangeDetectionStrategy,Component,inject,signal} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { CreateTransactionDto } from '../../../../shared/models/create-transaction.dto';

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [TransactionFormComponent],
  templateUrl: './edit-transaction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTransactionComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly transactionService = inject(TransactionService);
  readonly transaction = toSignal(
    this.route.paramMap.pipe(
      switchMap(params =>
        this.transactionService.getTransactionById(
          // Number(params.get('id'))
          params.get('id') ?? ''
        )
      )
    )
  );

  save(updatedTransaction:CreateTransactionDto): void {
    const transaction = this.transaction();
    if (!transaction) {
      return;
    }

    this.transactionService
      .updateTransaction(transaction.id,updatedTransaction)
      .subscribe(() => {
        void this.router.navigate([
          '/transactions'
        ]);
      });
  }
}