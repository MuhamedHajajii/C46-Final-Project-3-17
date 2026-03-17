import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { Stored_Keys } from '../../../core/constants/stored-keys';
import { isPlatformBrowser } from '@angular/common';

export interface IUser {
  name: string;
  email: string;
  role: string;
}

export interface IAuthResponse {
  message: string;
  user: IUser;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platform = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  // server => html
  // browser => html

  refreshToken = signal(0);

  userToken = computed(() => {
    this.refreshToken();

    if (isPlatformBrowser(this.platform)) {
      return localStorage.getItem(Stored_Keys.token);
    } else {
      return null;
    }
  });

  login(userData: {}) {
    return this.http.post<IAuthResponse>(App_Apis.auth.login, userData);
  }

  register(userData: {}) {
    return this.http.post<IAuthResponse>(App_Apis.auth.register, userData);
  }
}
