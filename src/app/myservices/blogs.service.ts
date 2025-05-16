import { Injectable } from '@angular/core';
import { BlogsModel } from '../myinterfaces/blogs';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient) { }

  url = "https://dev.to/api";
  defaultBlogData: BlogsModel = {};

  async getAllBlogs(): Promise<BlogsModel[]> {
    try {
      const res = this.http.get<BlogsModel[]>(`${this.url}/articles`);
      return await firstValueFrom(res);
    } catch (e) {
      return [this.defaultBlogData];
    }
  }

  async getAllBlogsSampleFeatured(): Promise<BlogsModel[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // simulate delay
      const res = this.http.get<BlogsModel[]>(`${this.url}/articles?page=1&per_page=10`);
      return await firstValueFrom(res);
    } catch (e) {
      return [this.defaultBlogData];
    }
  }

  async getBlogById(id: number): Promise<BlogsModel> {
    try {
      const res = this.http.get<BlogsModel>(`${this.url}/articles/${id}`);
      return await firstValueFrom(res);
    } catch (e) {
      return this.defaultBlogData;
    }
  }
}
