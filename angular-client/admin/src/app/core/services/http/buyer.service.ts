import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable} from 'rxjs';
import { Buyer } from '../../../shared/model/buyer';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandler } from '../../errors/error';
@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  url:string = "http://localhost:3000/api/buyer";
  constructor(private client:HttpClient, private errorHandler: GlobalErrorHandler) { }

  retrieveBuyersWithOrders():Observable<any>{
    return this.client.get<Buyer[]>(this.url).pipe(
          catchError(this.errorHandler.handleError)   // Handle errors globally
        );
  }

  
}
