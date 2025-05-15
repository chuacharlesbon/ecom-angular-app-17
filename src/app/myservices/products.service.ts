import { Injectable } from '@angular/core';
import { Product, ProductsModel } from '../myinterfaces/products';
import { CheckoutModel } from '../myinterfaces/checkout';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  url = "https://dummyjson.com";
  defaultProductData: ProductsModel = {};
  defaultSingleProductData: Product = {};
  defaultCheckoutModel: CheckoutModel = {};

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

  async productSearch(keyword: string): Promise<ProductsModel> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data = await fetch(`${this.url}/products/search?q=${keyword}`);
      return await data.json();
    } catch (e) {
      return this.defaultProductData;
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const data = await fetch(`${this.url}/products/${id}`);
      return await data.json();
    } catch (e) {
      return this.defaultSingleProductData;
    }
  }

  async productCheckout(
    amount: number,
    externalId: string,
    successRedirectUrl: string,
    failureRedirectUrl: string,
  ): Promise<CheckoutModel> {
    try {
      const data = await fetch(
        'https://share-to-earn.vercel.app/api/v1/payments/createInvoice',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            externalId,
            successRedirectUrl,
            failureRedirectUrl,
          }),
        }
      );
      return await data.json();
    } catch (e) {
      return this.defaultCheckoutModel;
    }
  }
}
