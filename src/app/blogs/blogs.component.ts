import { Component, inject } from '@angular/core';
import { BlogsModel } from '../myinterfaces/blogs';
import { BlogsService } from '../myservices/blogs.service';
import { routeNames } from '../app.routes';
import { BlogsCardsComponent } from '../mywidgets/blogs-cards/blogs-cards.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, BlogsCardsComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  // Blogs
  blogsList: BlogsModel[] = [];
  blogsService: BlogsService = inject(BlogsService);
  loadingBlog: boolean = true;
  blogsLink = `/${routeNames.blog.path}`;

  async ngAfterViewInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const tempBlogList = await this.blogsService.getAllBlogsSampleFeatured();
    this.blogsList = tempBlogList ?? [];
    this.loadingBlog = false; // done loading
  }
}
