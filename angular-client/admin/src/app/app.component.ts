import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { BuyerService } from './core/services/http/buyer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterModule, NavBarComponent],
  providers: [BuyerService]  // Add services if needed explicitly
})
export class AppComponent {
  
}
