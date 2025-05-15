import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../myservices/products.service';
import { Product } from '../myinterfaces/products';
import { BlogsModel } from '../myinterfaces/blogs';
import { BlogsService } from '../myservices/blogs.service';
import { routeNames } from '../app.routes';
import { BlogsCardsComponent } from '../mywidgets/blogs-cards/blogs-cards.component';
import { CommonModule } from '@angular/common';
import { BlogsStore } from '../mystores/blogs.store';
import { ProductsStore } from '../mystores/products.store';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CommonModule, BlogsCardsComponent, RouterModule],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  productData: Product | undefined;

  // Blogs
  blogsStore = inject(BlogsStore);
  blogsList = this.blogsStore.blogs$;
  loadingBlog = this.blogsStore.loading$;
  blogsService: BlogsService = inject(BlogsService);
  blogsLink = `/${routeNames.blog.path}`;

  // Product Cart
  productsStore = inject(ProductsStore);

  addToCart(item: Product | undefined){
    console.log("add to cart");
    if(item){
      console.log("item value");
      this.productsStore.addToCart(item);
    }
  }

  constructor() {
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    this.productsService.getProductById(productId).then(productData => {
      this.productData = productData;
    });
  }

  async ngOnInit() {
    // Load Blogs if empty
    if (this.blogsStore.getBlogsSnapshot().length === 0) {
      this.blogsStore.loadBlogs();
    }
  }

  async ngAfterViewInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // const tempBlogList = await this.blogsService.getAllBlogsSampleFeatured();
    // this.blogsList = tempBlogList ?? [];
    // this.loadingBlog = false; // done loading
  }
}
