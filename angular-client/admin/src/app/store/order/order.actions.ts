import { createAction, props } from "@ngrx/store";
import { Order } from "../../shared/model/order";

export const orderCreate = createAction(
  "[Order] Create Order",
  props<{ value: Order }>()
);
