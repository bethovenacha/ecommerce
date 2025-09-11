import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderState } from "./order.state";

// 👇 Key must match app.config.ts
export const selectOrderState = createFeatureSelector<OrderState>("orderState");

export const allOrdersSelector = createSelector(
  selectOrderState,
  (state: OrderState) => state.orders
);
