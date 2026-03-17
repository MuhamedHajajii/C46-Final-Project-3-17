import { Component, input } from '@angular/core';
import { IProduct } from '../../interfaces/IAllProductsResponse';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productDetails = input<IProduct | null>(null);
}
