import { Component, Input } from '@angular/core';
import { Product } from '../../myinterfaces/products';
import { RouterModule } from '@angular/router';
import { routeNames } from '../../app.routes';

@Component({
  selector: 'app-product-cards',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css'
})
export class ProductCardsComponent {
  @Input() productData!: Product;
  productsLink = `/${routeNames.product.path}`;
}
