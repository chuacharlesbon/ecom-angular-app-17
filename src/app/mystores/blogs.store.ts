// blogs.store.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlogsService } from '../myservices/blogs.service';
import { BlogsModel } from '../myinterfaces/blogs';

@Injectable({ providedIn: 'root' })
export class BlogsStore {
  private blogsSubject = new BehaviorSubject<BlogsModel[]>([]);
  blogs$ = this.blogsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private blogsService: BlogsService) {}

  async loadBlogs() {
    this.loadingSubject.next(true);
    const blogs = await this.blogsService.getAllBlogsSampleFeatured();
    this.blogsSubject.next(blogs ?? []);
    this.loadingSubject.next(false);
  }

  // Optional: for getting current value synchronously
  getBlogsSnapshot() {
    return this.blogsSubject.getValue();
  }
}
