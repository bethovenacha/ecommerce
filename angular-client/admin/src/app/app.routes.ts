import { Routes } from '@angular/router';
import { OrderComponent } from './features/feature1/components/order/order.component';
import { BuyerComponent } from './features/feature1/components/buyer/buyer.component';

export const routes: Routes = [
  { path: '', redirectTo: '/buyers', pathMatch: 'full' },  // Redirect to buyer list by default
  { path: 'buyers', component: BuyerComponent },  // Buyer list route
  { path: 'orders/:buyerId', component: OrderComponent },  // Order management route with buyerId
  { path: '**', redirectTo: '/' }  // Wildcard route for invalid paths
];
