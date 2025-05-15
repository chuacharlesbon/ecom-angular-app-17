import { Component, inject } from '@angular/core';
import { ProductsStore } from '../mystores/products.store';
import { CommonModule } from '@angular/common';
import { CartCardsComponent } from '../mywidgets/cart-cards/cart-cards.component';
import { Subscription } from 'rxjs';
import { Product } from '../myinterfaces/products';
import { CheckoutModel } from '../myinterfaces/checkout';
import { ProductsService } from '../myservices/products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartCardsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  // Products
  productsService: ProductsService = inject(ProductsService);
  productsStore = inject(ProductsStore);
  cart = this.productsStore.cart$;
  checkout = this.productsStore.checkout$;

  // Checkout
  loading: boolean = false;
  totalAmount = 0;
  private checkoutSub!: Subscription;

  ngAfterViewInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Subscribe to checkout list changes
    this.checkoutSub = this.checkout.subscribe((products: Product[]) => {
      const total = products.reduce((acc, product) => acc + (product?.price ?? 0), 0);
      this.totalAmount = parseFloat(total.toFixed(2));
    });
  }

  ngOnDestroy(): void {
    this.productsStore.clearCheckout();
    this.checkoutSub?.unsubscribe();
  }

  async onCheckout() {
    this.loading = true;
    try {
      const result: CheckoutModel = await this.productsService.productCheckout(
        this.totalAmount,
        "GuestUser12345",
        "https://shopnetworkph-angular.vercel.app/checkout-success",
        "https://shopnetworkph-angular.vercel.app/checkout-failed",
      );
  
      if (result?.invoiceUrl) {
        window.location.href = result.invoiceUrl; // Navigate to external URL
      } else {
        console.error('No URL returned from checkout.');
        this.loading = false;
      }
    } catch (e) {
      this.loading = false;
    }
  }
}
