import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { routeNames } from '../app.routes';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  router = inject(Router); // Inject Router

  async toLogin() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await new Promise(resolve => setTimeout(resolve, 2000)); // simulate delay
    this.router.navigate([routeNames.login.path]);
  }

  async ngOnInit() {
    this.toLogin();
  }
}
