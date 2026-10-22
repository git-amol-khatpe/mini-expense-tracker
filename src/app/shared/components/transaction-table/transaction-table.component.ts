import {ChangeDetectionStrategy,Component,input, output} from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionTableComponent {
  readonly transactions = input.required<Transaction[]>();
  readonly showActions = input(true);
  readonly deleteClicked = output<string>();

}