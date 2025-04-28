import { Routes } from '@angular/router';
import { OrderComponent } from './features/feature1/components/order/order.component';
import { BuyerComponent } from './features/feature1/components/buyer/buyer.component';
import { AppComponent } from './app.component';
import { InvalidComponent } from './shared/components/invalid/invalid.component';
import { HomeComponent } from './shared/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'app', component: AppComponent },  // Redirect to buyer list by default
  { path: 'buyers', component: BuyerComponent },  // Buyer list route
  { path: 'orders/:buyerId', component: OrderComponent },
  { path: 'invalid', component: InvalidComponent },   // Order management route with buyerId
  { path: '**', redirectTo: '/invalid' }  // Wildcard route for invalid paths
];
