import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent {
  user: { name: string } | null = { name: '' }; // Example user object; set to null if not logged in
  isLoggedIn: boolean = false; // Example login status
}
