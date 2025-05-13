import { Injectable } from '@angular/core';
import { BlogsModel } from '../myinterfaces/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor() { }

  url = "https://dev.to/api";
  defaultBlogData: BlogsModel = {};

  async getAllBlogs(): Promise<BlogsModel[]> {
    try {
      const data = await fetch(`${this.url}/articles`);
      return await data.json();
    } catch (e) {
      return [this.defaultBlogData];
    }
  }

  async getAllBlogsSampleFeatured(): Promise<BlogsModel[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data = await fetch(`${this.url}/articles?page=1&per_page=10`);
      return await data.json();
    } catch (e) {
      return [this.defaultBlogData];
    }
  }

  async getBlogById(id: number): Promise<BlogsModel> {
      try {
        const data = await fetch(`${this.url}/articles/${id}`);
        return await data.json();
      } catch (e) {
        return this.defaultBlogData;
      }
    }
}
