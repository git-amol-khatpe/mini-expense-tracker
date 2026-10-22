import {ChangeDetectionStrategy,Component,input,output} from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  readonly title = input('Confirm Action');
  readonly message = input('Are you sure?');
  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
}