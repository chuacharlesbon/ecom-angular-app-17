import { Component, inject } from '@angular/core';
import { BlogsService } from '../myservices/blogs.service';
import { routeNames } from '../app.routes';
import { BlogsModel } from '../myinterfaces/blogs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogsCardsComponent } from '../mywidgets/blogs-cards/blogs-cards.component';
import { Subscription } from 'rxjs';
import { BlogsStore } from '../mystores/blogs.store';

@Component({
  selector: 'app-blogs-details',
  standalone: true,
  imports: [CommonModule, BlogsCardsComponent, RouterModule],
  templateUrl: './blogs-details.component.html',
  styleUrl: './blogs-details.component.css'
})
export class BlogsDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private routeSub = Subscription.EMPTY;

  // Blogs
  blogData: BlogsModel | undefined;
  blogsStore = inject(BlogsStore);
  blogsList = this.blogsStore.blogs$;
  loadingBlog = this.blogsStore.loading$;
  blogsService: BlogsService = inject(BlogsService);
  blogsLink = `/${routeNames.blog.path}`;

  constructor() {
    // const productId = parseInt(this.route.snapshot.params['id'], 10);
    // this.blogsService.getBlogById(productId).then(blogData => {
    //   this.blogData = blogData;
    // });
  }

  async ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      const blogId = parseInt(this.route.snapshot.params['id'], 10);
      this.blogsService.getBlogById(blogId).then(blogData => {
        this.blogData = blogData;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
    
    // Load Blogs if empty
    if (this.blogsStore.getBlogsSnapshot().length === 0) {
      this.blogsStore.loadBlogs();
    }
  }

  async ngAfterViewInit() {
    // const tempBlogList = await this.blogsService.getAllBlogsSampleFeatured();
    // this.blogsList = tempBlogList ?? [];
    // this.loadingBlog = false; // done loading
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe(); // Prevent memory leaks
  }
}
