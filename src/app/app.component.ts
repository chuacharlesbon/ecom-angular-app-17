import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { routeNames } from './app.routes';
import { FooterComponent } from './mywidgets/footer/footer.component';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private offcanvasService: NgbOffcanvas, private router: Router) {}

  @ViewChild('drawer') drawer: any;

  openDrawer() {
    this.offcanvasService.open(this.drawer, { position: 'start' }); // 'start' = left side
  }

  navigateAndClose(offcanvas: any, path: string) {
    this.router.navigate([path]);
    offcanvas.dismiss();
  }
}
