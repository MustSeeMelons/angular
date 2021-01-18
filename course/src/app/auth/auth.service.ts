import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthRespnse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  timer;
  constructor(private http: HttpClient) {}

  autoLogin = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loaded = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loaded.token) {
      this.autoLogout(
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      );

      this.user.next(loaded);
    }
  };

  autoLogout = (expirationDuration: number) => {
    this.timer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  };

  login = (email: string, password: string) => {
    return this.http
      .post<AuthRespnse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
        {
          email,
          password,
          returnSecureToken: true,
        },
        {
          params: new HttpParams().append(
            'key',
            'AIzaSyBPmUmMQtmPIV-LKYoUbeRtStwEiKgqC8g'
          ),
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.idToken,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  };

  signUp = (email: string, password: string) => {
    return this.http
      .post<AuthRespnse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
        {
          email,
          password,
          returnSecureToken: true,
        },
        {
          params: new HttpParams().append(
            'key',
            'AIzaSyBPmUmMQtmPIV-LKYoUbeRtStwEiKgqC8g'
          ),
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.idToken,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  };

  logout = () => {
    this.user.next(null);
    localStorage.clear();
    this.timer && clearTimeout(this.timer);

    this.timer = null;
  };

  private handleAuthentication = (
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) => {
    const user = new User(
      email,
      userId,
      token,
      new Date(new Date().getTime() + expiresIn * 1000)
    );

    this.autoLogout(expiresIn * 1000);

    this.user.next(user);

    localStorage.setItem('userData', JSON.stringify(user));
  };

  private handleError = (err: HttpErrorResponse) => {
    let msg;

    console.log(err);

    if (!err.error || !err.error.error) {
      return throwError('Something hit the fan.');
    }

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        msg = 'Email exists you maggot';
        break;
      case 'INVALID_PASSWORD':
        msg = 'Combo breaker';
        break;
      case 'USER_DISABLED':
        msg = 'Ha ha. account goes bang bang';
        break;
      case 'EMAIL_NOT_FOUND':
        msg = 'Are you registered?';
        break;
      default:
        msg = 'Something hit the fan.';
    }

    return throwError(msg);
  };
}
