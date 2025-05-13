import { Component, inject } from '@angular/core';
import { Product } from '../myinterfaces/products';
import { ProductsService } from '../myservices/products.service';
import { ProductCardsComponent } from '../mywidgets/product-cards/product-cards.component';
import { CommonModule } from '@angular/common';
import { routeNames } from '../app.routes';
import { RouterModule } from '@angular/router';
import { BlogsService } from '../myservices/blogs.service';
import { BlogsCardsComponent } from "../mywidgets/blogs-cards/blogs-cards.component";
import { BlogsModel } from '../myinterfaces/blogs';
import { BlogsStore } from '../mystores/blogs.store';
import { ProductsStore } from '../mystores/products.store';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardsComponent, BlogsCardsComponent],
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
  productsStore = inject(ProductsStore);
  productsList = this.productsStore.products$;
  loading = this.productsStore.loading$;
  productsService: ProductsService = inject(ProductsService);
  productsLink = `/${routeNames.product.path}`;

  // Blogs
  blogsStore = inject(BlogsStore);
  blogsList = this.blogsStore.blogs$;
  loadingBlog = this.blogsStore.loading$;
  blogsService: BlogsService = inject(BlogsService);
  blogsLink = `/${routeNames.blog.path}`;

  constructor() {
    this.currentDate = this.currentDate;
    this.currentYear = this.currentYear;
    this.newMonth = (this.months[this.currentMonth]).toString();
  }

  async ngOnInit() {
    // Load Products if empty
    if (this.productsStore.getProductsSnapshot().length === 0) {
      this.productsStore.loadProducts();
    }

    // Load Blogs if empty
    if (this.blogsStore.getBlogsSnapshot().length === 0) {
      this.blogsStore.loadBlogs();
    }
  }

  async ngAfterViewInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // const tempProductList = await this.productsService.getAllProductsSampleFeatured();
    // this.productsList = tempProductList.products ?? [];
    // this.loading = false; // done loading

    // const tempBlogList = await this.blogsService.getAllBlogsSampleFeatured();
    // this.blogsList = tempBlogList ?? [];
    // this.loadingBlog = false; // done loading
  }
}
