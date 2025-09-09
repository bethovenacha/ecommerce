import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BuyerService } from '../../../../core/services/http/buyer.service';
import { Buyer } from '../../../../shared/model/buyer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer',
  standalone: true,  // optional depending on your project setup
  imports: [CommonModule],
  templateUrl: './buyer.component.html',
  styleUrl: './buyer.component.sass'
})
export class BuyerComponent {
  buyers: Buyer[] = [];
  buyerService: BuyerService = inject(BuyerService);
  router: Router = inject(Router);
  
  constructor() {
    this.buyerService.retrieveBuyersWithOrders().subscribe({
      next: (data) => {
        this.buyers = data;
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  // Navigate to orders
  viewOrders(buyerId: string) {
    this.router.navigate(['/orders', buyerId]);
  }

  trackById(index: number, buyer: Buyer): string {
    return buyer.id;
  }
  
}
