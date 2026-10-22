import {ChangeDetectionStrategy, Component,computed,inject} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TransactionService } from '../../../transactions/services/transaction.service';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { TransactionTableComponent } from '../../../../shared/components/transaction-table/transaction-table.component';
import { IncomeExpenseChartComponent } from '../../../../shared/components/income-expense-chart/income-expense-chart.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatCardComponent, TransactionTableComponent, IncomeExpenseChartComponent]
})
export class DashboardComponent {
  private readonly transactionService = inject(TransactionService);
  readonly authService = inject(AuthService);
  readonly transactions = toSignal(
    this.transactionService.getTransactions(),
    {
      initialValue: []
    }
  );

  readonly totalIncome = computed(() =>
    this.transactions()
      .filter(
        transaction =>
          transaction.type === 'income'
      )
      .reduce((total, transaction) => total + transaction.amount,0)
  );

  readonly totalExpense = computed(() =>
    this.transactions()
      .filter(transaction => transaction.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount,0)
  );

  readonly netCashFlow = computed(() =>
    this.totalIncome() -
    this.totalExpense()
  );

  readonly recentTransactions = computed(() =>
    [...this.transactions()]
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 5)
  );
}