import { Component, inject } from "@angular/core";
import { OrderService } from "../../../../core/services/http/order.service";
import { Order } from "../../../../shared/model/order";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { orderCreate } from "../../../../store/order/order.actions";
import { AsyncPipe, CommonModule } from "@angular/common";
import { allOrdersSelector } from "../../../../store/order/order.selector";
import { OrderState } from "../../../../store/order/order.state";

@Component({
  selector: "app-order",
  imports: [FormsModule, AsyncPipe, CommonModule],
  templateUrl: "./order.component.html",
  styleUrl: "./order.component.sass",
})
export class OrderComponent {
  orders: Order[] = [];
  orderToUpdate: Order | null = null;
  errorMessage = "";
  isLoading = false;
  buyerId = "";

  orderService: OrderService = inject(OrderService);
  route: ActivatedRoute = inject(ActivatedRoute);
  store: Store<{ orderState: OrderState }> = inject(Store);

  orders$!: Observable<Order[]>;

  constructor() {
    const order: Order = { id: "1", productId: "2", quantity: 1, status: "old" };
    this.store.dispatch(orderCreate({ value: order }));

    this.orders$ = toObservable(this.store.selectSignal(allOrdersSelector));
  }

  loadOrders() {
    this.isLoading = true;
    this.orderService.retrieveOrdersByBuyerId(this.buyerId).subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || "Error loading orders";
        this.isLoading = false;
      },
    });
  }

  updateOrderStatus(order: Order) {
    this.orderService.updateById(order.id, order).subscribe({
      next: (updatedOrder: Order) => {
        console.log("Order updated successfully:", updatedOrder);
        alert("Order status updated successfully!");
      },
      error: (error) => {
        console.error("Error updating order:", error);
        alert("Failed to update order status.");
      },
    });
  }

  trackById(index: number, order: Order): string {
    return order.id;
  }
}
