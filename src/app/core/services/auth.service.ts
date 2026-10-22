import {Injectable, computed, signal} from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly currentUser = signal<User | null>(null);

  readonly isAuthenticated = computed(() =>
      this.currentUser() !== null
  );

  readonly isAdmin = computed(() =>
      this.currentUser()?.role === 'admin'
  );

  login(user: User): void {
    this.currentUser.set(user);
    localStorage.setItem(
      'currentUser',
      JSON.stringify(user)
    );
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem(
      'currentUser'
    );
  }

restoreSession(): void {

  const storedUser =
    localStorage.getItem(
      'currentUser'
    );

  if (!storedUser) {
    return;
  }

  try {

    const user =
      JSON.parse(storedUser);

    this.currentUser.set(user);

  } catch {

    localStorage.removeItem(
      'currentUser'
    );
  }
}
}