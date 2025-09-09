import { createReducer, on } from "@ngrx/store";
import { Order } from "../shared/model/order";
import { orderActions } from "./order.actions";

const initialState:Order[] = [];
export const orderReducer = createReducer(
    initialState,
    on(orderActions, (state, { orders }) => [...orders]) // Use the payload // Example action handler
);