import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiBaseUrl}/users`;

  getByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}?username=${username}`
    );
  }

  findByUsername(username: string): Observable<User | null> {
    return this.getByUsername(username).pipe(
      map(users => users[0] ?? null)
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(
      `${this.apiUrl}/${id}`,
      user
    );
  }
}