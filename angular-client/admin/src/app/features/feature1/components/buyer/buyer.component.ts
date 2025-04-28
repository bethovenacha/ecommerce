import { Component } from '@angular/core';
import { BuyerService } from '../../../../core/services/http/buyer.service';
import { Buyer } from '../../../../shared/model/buyer';

@Component({
  selector: 'app-buyer',
  imports: [],
  templateUrl: './buyer.component.html',
  styleUrl: './buyer.component.sass'
})
export class BuyerComponent {
  buyers: Buyer[] = [];
  constructor(private buyerService:BuyerService){
    this.buyerService.retrieveBuyersWithOrders().subscribe({
      next : (data)=>{
        console.log(data);
        //this.buyers.push(data);
        //console.log(this.buyers);
      },
      error: (error)=>{
        console.log(error.message);
      }
    });
  }

}
