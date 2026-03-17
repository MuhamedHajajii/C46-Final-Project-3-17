import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../features/products/interfaces/IAllProductsResponse';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Stored_Keys } from '../../../core/constants/stored-keys';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private readonly authService = inject(AuthService);

  userToken = this.authService.userToken;

  prod = input.required<IProduct>();

  onAddToCart(prod: IProduct): void {
    if (!this.userToken()) {
      console.log(prod);
      const allProduct = localStorage.getItem(Stored_Keys.allProductsIds) ?? '';
      const storedProducts: any[] = allProduct ? JSON.parse(allProduct) : [];

      let productCount = storedProducts;
    }
  }
}
