import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { IAllProductsCart } from '../../interfaces/IGetUserCartResponse';
import { LoadingDataSpinnerComponent } from '../../../../shared/components/loading-data-spinner/loading-data-spinner.component';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, CurrencyPipe, LoadingDataSpinnerComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  private readonly authServiceauth = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly platform = inject(PLATFORM_ID);

  userToken = this.authServiceauth.userToken;
  isLoading = signal(false);
  totalPrice = signal(0);
  allProducts = signal<null | IAllProductsCart>(null);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform) && this.userToken()) {
      this.getUserCart();
    }
  }

  getUserCart(): void {
    this.isLoading.set(true);
    this.cartService.getUserCart().subscribe({
      next: (response) => {
        this.isLoading.set(false);
        console.log(response.data, '============');
        this.allProducts.set(response.data);
        this.totalPrice.set(response.data.totalCartPrice);
      },
    });
  }

  updateProductCount(productId: string, count: number): void {
    this.cartService.updateProductCount(productId, count).subscribe({
      next: (response) => {
        console.log(response);
        this.allProducts.set(response.data);
        this.totalPrice.set(response.data.totalCartPrice);
      },
    });
  }

  deleteProduct(productId: string): void {
    this.cartService.deleteProduct(productId).subscribe({
      next: (response) => {
        this.allProducts.set(response.data);
        this.totalPrice.set(response.data.totalCartPrice);
      },
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (response) => {
        this.allProducts.set(null);
        this.cartService.numOfCartItems.set(0);
      },
    });
  }
}
