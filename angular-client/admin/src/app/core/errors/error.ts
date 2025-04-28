
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
// Handle HTTP errors globally
export class GlobalErrorHandler {

    handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          errorMessage = `Server-side error: ${error.status} - ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      }
    
  }