import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { orderCreate } from "./order.actions";
import { tap } from "rxjs";

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