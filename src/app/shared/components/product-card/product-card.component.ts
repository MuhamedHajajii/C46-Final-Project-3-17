import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../features/products/interfaces/IAllProductsResponse';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Stored_Keys } from '../../../core/constants/stored-keys';
import { CartService } from '../../../features/cart/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  userToken = this.authService.userToken;

  prod = input.required<IProduct>();

  isLoading = signal(false);

  onAddToCart(prod: IProduct): void {
    if (!this.userToken()) {
      console.log(prod);
      const allProduct = localStorage.getItem(Stored_Keys.allProductsIds) ?? '';
      const storedProducts: any[] = allProduct ? JSON.parse(allProduct) : [];
    } else {
      if (this.isLoading()) return;

      this.isLoading.set(true);

      this.cartService.addToCart(prod.id).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading.set(false);
          this.cartService.numOfCartItems.set(response.numOfCartItems);
          this.toastrService.success(response.message, 'success', {
            positionClass: 'toast-top-left',
          });
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error.message);
          this.isLoading.set(false);
          this.toastrService.error(error.error.message);
        },
      });
    }
  }
}
