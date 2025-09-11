import { createReducer, on } from "@ngrx/store";
import { orderCreate } from "./order.actions";
import { OrderState } from "./order.state";

const initialState: OrderState = {
  orders: []
};

export const orderReducer = createReducer(
  initialState,
  on(orderCreate, (state, { value }) => ({
    ...state,
    orders: [...state.orders, value]
  }))
);
