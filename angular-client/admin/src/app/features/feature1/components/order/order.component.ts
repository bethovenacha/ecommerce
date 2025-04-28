import { Component } from '@angular/core';
import { OrderService } from '../../../../core/services/http/order.service';
import { Order } from '../../../../shared/model/order';
@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.sass'
})
export class OrderComponent {

  // Variable to hold orders retrieved from the service
  orders: Order[] = [];
  // Variable to hold a single order for updating
  orderToUpdate: Order | null = null;
  // Variable to hold error messages
  errorMessage: string = '';
  // Flag to display loading indicator
  isLoading: boolean = false;

  constructor(private orderService:OrderService){}
}
