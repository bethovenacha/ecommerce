import { Component } from '@angular/core';
import { OrderService } from '../../../../core/services/http/order.service';
import { Order } from '../../../../shared/model/order';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.sass'
})
export class OrderComponent {

  orders: Order[] = [];
  orderToUpdate: Order | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;
  
  buyerId: string = ''; // <-- new property to hold the buyer ID

  constructor(private orderService:OrderService, private route:ActivatedRoute){
    // Read the buyerId from the route parameters
    this.buyerId = this.route.snapshot.paramMap.get('buyerId') || '';
    if (this.buyerId) {
      this.loadOrders();
    }
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
