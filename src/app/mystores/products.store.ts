// blogs.store.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../myinterfaces/products';
import { ProductsService } from '../myservices/products.service';

@Injectable({ providedIn: 'root' })
export class ProductsStore {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private searchResultSubject = new BehaviorSubject<Product[]>([]);
  searchResult$ = this.searchResultSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private productsService: ProductsService) {}

  async loadProducts() {
    this.loadingSubject.next(true);
    const products = await this.productsService.getAllProductsSampleFeatured();
    this.productsSubject.next(products.products ?? []);
    this.searchResultSubject.next(products.products ?? []);
    this.loadingSubject.next(false);
  }

  async searchProduct(keyword: string) {
    this.loadingSubject.next(true);
    const products = await this.productsService.productSearch(keyword);
    this.searchResultSubject.next(products.products ?? []);
    this.loadingSubject.next(false);
  }

  async clearSearches() {
    this.searchResultSubject.next([]);
  }

  // Optional: for getting current value synchronously
  getProductsSnapshot() {
    return this.productsSubject.getValue();
  }

  // Optional: for getting current value synchronously
  getSearchResultSnapshot() {
    return this.searchResultSubject.getValue();
  }
}
