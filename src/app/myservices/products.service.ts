import { Injectable } from '@angular/core';
import { ProductsModel } from '../myinterfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  url = "https://dummyjson.com";
  defaultProductData: ProductsModel = {};

  async getAllProducts(): Promise<ProductsModel> {
    try {
      const data = await fetch(`${this.url}/products`);
      return await data.json();
    } catch (e) {
      return this.defaultProductData;
    }
  }

  async getAllProductsSampleFeatured(): Promise<ProductsModel> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data = await fetch(`${this.url}/products?limit=6&skip=0`);
      return await data.json();
    } catch (e) {
      return this.defaultProductData;
    }
  }
}
