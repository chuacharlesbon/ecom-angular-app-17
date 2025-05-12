import { Component, Input } from '@angular/core';
import { Product } from '../../myinterfaces/products';

@Component({
  selector: 'app-product-cards',
  standalone: true,
  imports: [],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css'
})
export class ProductCardsComponent {
  @Input() productData!: Product;
}
