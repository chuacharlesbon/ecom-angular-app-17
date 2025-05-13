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
import { BlogsStore } from '../mystores/blogs.store';
import { ProductsStore } from '../mystores/products.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardsComponent, BlogsCardsComponent, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
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
