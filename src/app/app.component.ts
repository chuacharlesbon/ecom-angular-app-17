import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { routeNames } from './app.routes';
import { FooterComponent } from './mywidgets/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatIconModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecom-angular-app-17';
  
  productsLink = `/${routeNames.product.path}`;
  aboutUsLink = `/${routeNames.about.path}`;
  contactUsLink = `/${routeNames.contact.path}`;
}
