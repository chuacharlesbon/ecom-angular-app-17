import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../myservices/products.service';
import { Product } from '../myinterfaces/products';
import { BlogsModel } from '../myinterfaces/blogs';
import { BlogsService } from '../myservices/blogs.service';
import { routeNames } from '../app.routes';
import { BlogsCardsComponent } from '../mywidgets/blogs-cards/blogs-cards.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CommonModule, BlogsCardsComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  productData: Product | undefined;

  // Blogs
  blogsList: BlogsModel[] = [];
  blogsService: BlogsService = inject(BlogsService);
  loadingBlog: boolean = true;
  blogsLink = `/${routeNames.blog.path}`;

  constructor() {
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    this.productsService.getProductById(productId).then(productData => {
      this.productData = productData;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async ngAfterViewInit() {
    const tempBlogList = await this.blogsService.getAllBlogsSampleFeatured();
    this.blogsList = tempBlogList ?? [];
    this.loadingBlog = false; // done loading
  }
}
