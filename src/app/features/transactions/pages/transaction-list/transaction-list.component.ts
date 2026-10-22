import {ChangeDetectionStrategy,Component,computed,inject,signal} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, combineLatest, debounceTime, distinctUntilChanged, finalize, map, of, startWith, Subject, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Transaction, TransactionFilter } from '../../../../shared/models/transaction.model';
import { LoadingIndicatorComponent } from '../../../../shared/components/loading-indicator/loading-indicator.component';
import { TransactionService } from '../../services/transaction.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TransactionTableComponent } from '../../../../shared/components/transaction-table/transaction-table.component';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    RouterLink,
    LoadingIndicatorComponent,
    TransactionTableComponent,
    ConfirmationDialogComponent
],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListComponent {
  private readonly transactionService = inject(TransactionService);

  readonly loading = signal(true);

  readonly error = signal<string | null>(null);

  readonly showDeleteDialog = signal(false);

  readonly selectedTransactionId = signal<string | null>(null);

  private readonly refresh$ = new Subject<void>();

  // private readonly searchSubject = new Subject<string>();

  // private readonly filterSubject = new Subject<TransactionFilter>();

  ngOnInit() {
    console.log('TransactionListComponent initialized');
  }

  readonly transactions = toSignal(
    this.refresh$.pipe(
      startWith(void 0),
      switchMap(() => {
        this.loading.set(true);
        return this.transactionService
          .getTransactions()
          .pipe(
            finalize(() => {
              this.loading.set(false);
            })
          );
      })
    ),
    {
      initialValue: []
    }
  );

  confirmDelete(): void {
    const id = this.selectedTransactionId();
    if (!id) {
      return;
    }

    this.transactionService.deleteTransaction(id)
      .subscribe(() => {
        this.showDeleteDialog.set(false);
        this.selectedTransactionId.set(null);
        this.refresh$.next();
      });
  }

  openDeleteDialog(transactionId: string): void {
    this.selectedTransactionId.set(
      transactionId
    );
    this.showDeleteDialog.set(true);
  }

  readonly searchTerm = signal('');
  readonly selectedFilter = signal<TransactionFilter>('all')
  readonly filteredTransactions = computed(() => {

    const search =
      this.searchTerm()
        .toLowerCase()
        .trim();

    const filter =
      this.selectedFilter();

    let result =
      this.transactions();

    if (filter !== 'all') {

      result =
        result.filter(
          transaction =>
            transaction.type === filter
        );

    }

    if (search) {

      result =
        result.filter(
          transaction =>
            transaction.title
              .toLowerCase()
              .includes(search)
        );

    }

    console.log(
      'Filtered count:',
      result.length
    );

    return result;
  });

  onSearch(event: Event): void {
    const value =
      (event.target as HTMLInputElement)
        .value;

    this.searchTerm.set(value);
  }
  onFilter(event: Event): void {
    const value =
      (event.target as HTMLSelectElement)
        .value as TransactionFilter;

    this.selectedFilter.set(value);
  }
}