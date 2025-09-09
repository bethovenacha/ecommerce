import { createAction, props } from "@ngrx/store";
import { Order } from "../shared/model/order";

export const orderActions = createAction(
    '[Order] Load Orders', props<{ orders: Order[] }>()
);