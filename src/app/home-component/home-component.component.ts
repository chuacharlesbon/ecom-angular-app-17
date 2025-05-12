import { Component, inject } from '@angular/core';
import { Product } from '../myinterfaces/products';
import { ProductsService } from '../myservices/products.service';
import { ProductCardsComponent } from '../mywidgets/product-cards/product-cards.component';
import { CommonModule } from '@angular/common';
import { routeNames } from '../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardsComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  
  // Sample Calendar Display
  newDate = new Date();
  currentDate = this.newDate.getDate().toString();
  currentMonth = this.newDate.getMonth();
  currentYear = this.newDate.getFullYear().toString();
  newMonth: string;

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Products
  productsList: Product[] = [];
  productsService: ProductsService = inject(ProductsService);
  loading: boolean = true;
  productsLink = `/${routeNames.product.path}`;

  constructor() {
    this.currentDate = this.currentDate;
    this.currentYear = this.currentYear;
    this.newMonth = (this.months[this.currentMonth]).toString();
  }

  async ngOnInit() {
    // const tempProductList = await this.productsService.getAllProductsSampleFeatured();
    // this.productsList = tempProductList.products ?? [];
    // this.loading = false; // done loading
  }

  async ngAfterViewInit() {
    const tempProductList = await this.productsService.getAllProductsSampleFeatured();
    this.productsList = tempProductList.products ?? [];
    this.loading = false; // done loading
  }
}
