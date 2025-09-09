import { createReducer, on } from "@ngrx/store";
import { Order } from "../shared/model/order";
import { orderCreate } from "./order.actions";

const initialState:Order[] = [];
export const orderReducer = createReducer(
    initialState,
    on(orderCreate, (state, { orders }) => [...orders]) // Use the payload // Example action handler
);