import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order } from '../shared/model/order';

export const selectOrderState = createFeatureSelector<Order[]>('orderReducer');

export const selectAllOrders = createSelector(
  selectOrderState,
  (orders: Order[]) => orders
);

