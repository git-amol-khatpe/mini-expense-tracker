import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';

import { UserService }
from '../../../../core/services/user.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  templateUrl:
    './user-management.component.html',
  styleUrl:
    './user-management.component.scss',
  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent {

  private readonly userService = inject(UserService);

  readonly users = toSignal(
    this.userService.getUsers(),
    {
      initialValue: []
    }
  );

  readonly activeAdmins = computed(
    () =>
      this.users().filter(
        user =>
          user.role === 'admin' &&
          user.active
      )
  );

  updateRole(
  userId: string,
  role: string
): void {

  this.userService
    .updateUser(
      userId,
      {
        role:
          role as 'admin' | 'user'
      }
    )
    .subscribe(() => {
      location.reload();
    });
  }

  toggleStatus(
  user: User
): void {

  const isLastAdmin =
    user.role === 'admin' &&
    user.active &&
    this.activeAdmins().length === 1;

  if (isLastAdmin) {

    alert(
      'Cannot deactivate the last active admin.'
    );

    return;
  }

  this.userService
    .updateUser(
      user.id,
      {
        active: !user.active
      }
    )
    .subscribe(() => {
      location.reload();
    });
  }
}