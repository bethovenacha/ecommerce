import { Inject, inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { orderCreate } from "./order.actions";
import { tap } from "rxjs";

// Effect to handle side effects for order actions
// if orderCreate is dispatched, log the order and save to localStorage
@Injectable()
export class OrderEffect {
    private orderActions$ = inject(Actions)
    saveOrder = createEffect(() => this.orderActions$.pipe(
        ofType(orderCreate),
        tap((action)=>{
            console.log("Order created:", action.value.status.toString());
            localStorage.setItem('lastOrder', JSON.stringify(action.value));
        })
       // ,  map((action) => orderCreatedSuccess({ id: action.id })) // 👈 must emit an Action
    ), { dispatch: false });
}