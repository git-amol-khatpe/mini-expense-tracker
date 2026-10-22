import { DecimalPipe } from '@angular/common';
import {ChangeDetectionStrategy,Component,input} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCardComponent {
  readonly title = input.required<string>();
  readonly value = input.required<number>();
}
