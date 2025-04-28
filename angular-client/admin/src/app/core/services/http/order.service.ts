import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../../../shared/model/order';
import { GlobalErrorHandler } from '../../errors/error';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
   url = "http://localhost:3000/api/orders";
  constructor(private client: HttpClient, private errorHandler:GlobalErrorHandler) { }

  // Retrieve orders by buyerID
  retrieveOrdersByBuyerId(buyerId: string): Observable<Order[]> {
    const retrievalUrl = `${this.url}?buyerId=${buyerId}`;
    return this.client.get<Order[]>(retrievalUrl).pipe(
      catchError(this.errorHandler.handleError)  // Handle errors globally
    );
  }

  // Update order by ID
  updateById(id: string, order: Order): Observable<Order> {
    const updateUrl = `${this.url}/${id}`;
    return this.client.put<Order>(updateUrl, order).pipe(
      catchError(this.errorHandler.handleError)  // Handle errors globally
    );
  }
}
