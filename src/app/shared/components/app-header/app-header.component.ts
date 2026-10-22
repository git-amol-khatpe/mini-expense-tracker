import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './app-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent {
  readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);

  logout(): void {
    this.authService.logout();

    void this.router.navigate([
      '/login'
    ]);
  }
}