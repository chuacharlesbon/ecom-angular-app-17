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

  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  private checkoutSubject = new BehaviorSubject<Product[]>([]);
  checkout$ = this.checkoutSubject.asObservable();

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

  clearSearches() {
    this.searchResultSubject.next([]);
  }

  addToCart(item: Product) {
    const currentCart: Product[] = this.cartSubject.getValue();
    if(!currentCart.includes(item)){
      const updatedCart = [...currentCart, item];
      this.cartSubject.next(updatedCart); 
    }
  }

  addRemoveCheckout(item: Product) {
    const currentCheckout = this.checkoutSubject.getValue();
  
    const itemExists = currentCheckout.some(product => product.id === item.id);
  
    const updatedCheckout = itemExists
      ? currentCheckout.filter(product => product.id !== item.id) // remove
      : [...currentCheckout, item]; // add
  
    this.checkoutSubject.next(updatedCheckout);
  }

  clearCheckout() {
    this.checkoutSubject.next([]);
  }

  // Optional: for getting current value synchronously
  getProductsSnapshot() {
    return this.productsSubject.getValue();
  }

  // Optional: for getting current value synchronously
  getSearchResultSnapshot() {
    return this.searchResultSubject.getValue();
  }

  // Optional: for getting current value synchronously
  getCartSnapshot() {
    return this.cartSubject.getValue();
  }
}
