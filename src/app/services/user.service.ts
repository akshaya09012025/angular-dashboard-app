

// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  addUser(user: User) {
    this.usersSubject.next([...this.usersSubject.value, user]);
  }
}
