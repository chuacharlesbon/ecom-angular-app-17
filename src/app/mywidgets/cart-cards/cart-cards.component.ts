import { Component, inject, Input } from '@angular/core';
import { Product } from '../../myinterfaces/products';
import { ProductsStore } from '../../mystores/products.store';

@Component({
  selector: 'app-cart-cards',
  standalone: true,
  imports: [],
  templateUrl: './cart-cards.component.html',
  styleUrl: './cart-cards.component.css'
})
export class CartCardsComponent {
  @Input() productData!: Product;

  // Product Cart
  productsStore = inject(ProductsStore);

  onCheckboxChange(event: Event) {
    this.productsStore.addRemoveCheckout(this.productData);
  }
}
