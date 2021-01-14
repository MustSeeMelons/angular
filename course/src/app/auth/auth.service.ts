import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  constructor(private http: HttpClient) {}

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
      .pipe(catchError(this.handleError));
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
      .pipe(catchError(this.handleError));
  };

  private handleError = (err: HttpErrorResponse) => {
    let msg;

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
