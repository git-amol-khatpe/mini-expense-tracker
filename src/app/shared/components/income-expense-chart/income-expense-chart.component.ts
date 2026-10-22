import {ChangeDetectionStrategy, Component,computed,input} from '@angular/core';

@Component({
  selector: 'app-income-expense-chart',
  standalone: true,
  templateUrl: './income-expense-chart.component.html',
  styleUrl: './income-expense-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeExpenseChartComponent {
  readonly income = input.required<number>();
  readonly expense = input.required<number>();

  readonly maxValue = computed(() =>
    Math.max(
      this.income(),
      this.expense(),
      1
    )
  );

  readonly incomeWidth = computed(() =>
    (this.income() / this.maxValue()) * 100
  );

  readonly expenseWidth = computed(() =>
    (this.expense() / this.maxValue()) * 100
  );
}