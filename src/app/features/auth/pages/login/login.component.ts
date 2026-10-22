import {ChangeDetectionStrategy,Component,inject,signal,OnInit} from '@angular/core';
import {NonNullableFormBuilder,ReactiveFormsModule,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {catchError,finalize,of} from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit{

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly form = this.fb.group({
    username: ['', Validators.required]
  });

  public currentYear:number = 2026;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      void this.router.navigate([
        '/dashboard'
      ]);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const username = this.form.controls.username.value;

    this.loading.set(true);
    this.error.set(null);

    this.userService
      .findByUsername(username)
      .pipe(
        catchError(() => {
          this.error.set(
            'Login failed.'
          );

          return of(null);
        }),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe(user => {

        if (!user) {

          this.error.set(
            'User not found.'
          );

          return;
        }

        if (!user.active) {

          this.error.set(
            'User account is inactive.'
          );

          return;
        }

        this.authService.login(user);

        void this.router.navigate([
          '/dashboard'
        ]);
      });
  }
}