import { Component, inject, Signal } from '@angular/core';
import { OrderService } from '../../../../core/services/http/order.service';
import { Order } from '../../../../shared/model/order';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { orderCreate } from '../../../../store/order.actions';
import { AsyncPipe, CommonModule } from '@angular/common';
import { selectAllOrders } from '../../../../store/order.selector';

@Component({
  selector: 'app-order',
  imports: [FormsModule, AsyncPipe, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.sass',
  
})
export class OrderComponent {

  orders: Order[] = [];
  orderToUpdate: Order | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;
  buyerId: string = ''; // <-- new property to hold the buyer ID
  //service injection
  orderService: OrderService = inject(OrderService);
  route: ActivatedRoute = inject(ActivatedRoute);
  // store has a key orderReducer which is an array of Order
  store:Store<{orderReducer:Order[]}> = inject(Store);
  orders$!: Observable<Order[]>;

  constructor(){
    this.orders.push({id:"1",productId:"2",quantity:1,status:"old"});
    this.store.dispatch(orderCreate({orders: this.orders}));

    //this.orders$ = toObservable(this.store.selectSignal(state=>state.orderReducer)) ;
    this.orders$ = toObservable(this.store.selectSignal(selectAllOrders)) ;
    // Read the buyerId from the route parameters
   // this.buyerId = this.route.snapshot.paramMap.get('buyerId') || '';
    //if (this.buyerId) {
    //  this.loadOrders();
    //}
  }
  //Loads the orders data from the database
  loadOrders() {
    this.isLoading = true;
    this.orderService.retrieveOrdersByBuyerId(this.buyerId)
      .subscribe({
        next: (orders: Order[]) => {
          this.orders = orders;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Error loading orders';
          this.isLoading = false;
        }
      });
  }

  updateOrderStatus(order: Order) {
    this.orderService.updateById(order.id, order).subscribe({
      next: (updatedOrder: Order) => {
        console.log('Order updated successfully:', updatedOrder);
        alert('Order status updated successfully!');
      },
      error: (error) => {
        console.error('Error updating order:', error);
        alert('Failed to update order status.');
      }
    });
  }

  // TrackBy function for performance
  trackById(index: number, order: Order): string {
    return order.id;
  }
}
