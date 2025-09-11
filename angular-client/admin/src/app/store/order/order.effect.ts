import { Inject, inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { orderCreate } from "./order.actions";
import { tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { OrderState } from "./order.state";

// Effect to handle side effects for order actions
// if orderCreate is dispatched, log the order and save to localStorage
@Injectable()
export class OrderEffect {
    private orderActions$ = inject(Actions)
    private store = inject(Store<{orderState: OrderState}>);
    saveOrder = createEffect(() => this.orderActions$.pipe(
        ofType(orderCreate),
        withLatestFrom(this.store.select(state => state.orderState.orders)), // get latest orders from state
        tap(([action,state])=>{
           // console.log("Order created:", action.value.status.toString());
           // localStorage.setItem('lastOrder', JSON.stringify(action.value));
            localStorage.setItem("orders", JSON.stringify(state));
            var orders = localStorage.getItem("orders");
            console.log("Order created:", JSON.stringify(orders));
         
        })
       // ,  map((action) => orderCreatedSuccess({ id: action.id })) // 👈 must emit an Action
    ), { dispatch: false });
}