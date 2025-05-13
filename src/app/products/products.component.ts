import { Component, inject } from '@angular/core';
import { Product } from '../myinterfaces/products';
import { ProductsService } from '../myservices/products.service';
import { routeNames } from '../app.routes';
import { BlogsModel } from '../myinterfaces/blogs';
import { BlogsService } from '../myservices/blogs.service';
import { CommonModule } from '@angular/common';
import { ProductCardsComponent } from '../mywidgets/product-cards/product-cards.component';
import { BlogsCardsComponent } from '../mywidgets/blogs-cards/blogs-cards.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardsComponent, BlogsCardsComponent, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  // Products
  productsList: Product[] = [];
  productsService: ProductsService = inject(ProductsService);
  loading: boolean = true;
  productsLink = `/${routeNames.product.path}`;

  // Blogs
  blogsList: BlogsModel[] = [];
  blogsService: BlogsService = inject(BlogsService);
  loadingBlog: boolean = true;
  blogsLink = `/${routeNames.blog.path}`;

  async ngOnInit() {
    // const tempProductList = await this.productsService.getAllProductsSampleFeatured();
    // this.productsList = tempProductList.products ?? [];
    // this.loading = false; // done loading
  }

  async ngAfterViewInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const tempProductList = await this.productsService.getAllProductsSampleFeatured();
    this.productsList = tempProductList.products ?? [];
    this.loading = false; // done loading

    const tempBlogList = await this.blogsService.getAllBlogsSampleFeatured();
    this.blogsList = tempBlogList ?? [];
    this.loadingBlog = false; // done loading
  }
}
