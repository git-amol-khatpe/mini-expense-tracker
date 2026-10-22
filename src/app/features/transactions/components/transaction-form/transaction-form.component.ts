import {ChangeDetectionStrategy,Component,effect,inject,input,output,signal} from '@angular/core';
import {ReactiveFormsModule,Validators,NonNullableFormBuilder} from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { catchError, finalize, of } from 'rxjs';
import { CreateTransactionDto } from '../../../../shared/models/create-transaction.dto';
import { TransactionType } from '../../../../shared/models/transaction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  readonly initialValue = input<CreateTransactionDto | null>(null);
  readonly formSubmitted = output<CreateTransactionDto>();

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    type: this.fb.control<TransactionType>('expense',Validators.required),
    amount: [0,[Validators.required, Validators.min(1)]],
    category: ['', Validators.required],
    date: ['', Validators.required],
    notes: ['']
  });

  private readonly transactionService = inject(TransactionService);
  readonly saving = signal(false);
  readonly saveError = signal<string | null>(null);

  constructor() {
    effect(() => {
        const value = this.initialValue();
        if (!value) {
          return;
        }
        this.form.patchValue(value);
      });
  }

  // submit(): void {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     return;
  //   }
  //   console.log('Transaction Form Value:',this.form.getRawValue());
  //   this.saving.set(true);
  //   this.saveError.set(null);

  //   const transaction: CreateTransactionDto = {
  //     userId: 2, // temporary until auth
  //     ...this.form.getRawValue()
  //   };

  //   this.transactionService.createTransaction(transaction)
  //   .pipe(
  //     catchError(() => {
  //       this.saveError.set(
  //         'Failed to save transaction.'
  //       );
  //       return of(null);
  //     }),
  //     finalize(() => {
  //       this.saving.set(false);
  //     })
  //   )
  //   .subscribe(createdTransaction => {
  //     if (!createdTransaction) {
  //       return;
  //     }
  //     console.log('Created transaction:',createdTransaction);
  //     this.form.reset({
  //       title: '',
  //       type: 'expense',
  //       amount: 0,
  //       category: '',
  //       date: '',
  //       notes: ''
  //     });
  //     void this.router.navigate([
  //       '/transactions'
  //     ]);
  //   });
  // }
  submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const transaction: CreateTransactionDto = {
    userId: 2, // Temporary until authentication is implemented
    ...this.form.getRawValue()
  };

  this.formSubmitted.emit(transaction);
  }

  redirectToTransactions(){
    this.router.navigate(['/transactions']);
  }
}