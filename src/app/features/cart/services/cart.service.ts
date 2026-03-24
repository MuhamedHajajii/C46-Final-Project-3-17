import { Injectable, signal } from '@angular/core';
import { baseHttp } from '../../../core/services/base-http.service';
import { App_Apis } from '../../../core/constants/app-apis';
import { IAddToCartResponse } from '../interfaces/IAddToCartResponse';
import { IGetUserCartResponse } from '../interfaces/IGetUserCartResponse';
import { HttpContext } from '@angular/common/http';
import { API_Version } from '../../../core/constants/api-versions';

@Injectable({
  providedIn: 'root',
})
export class CartService extends baseHttp {
  numOfCartItems = signal(0);
  baseUrl = `api/v2/cart`;

  // CRUD
  addToCart(productId: string) {
    return this.http.post<IAddToCartResponse>(this.baseUrl, { productId: productId });
  }

  getUserCart() {
    return this.http.get<IGetUserCartResponse>(this.baseUrl, {
      context: new HttpContext().set(API_Version, 'v2'),
    });
  }

  updateProductCount(productId: string, count: number) {
    return this.http.put<IGetUserCartResponse>(`${this.baseUrl}/${productId}`, {
      count: count,
    });
  }

  deleteProduct(productId: string) {
    return this.http.delete<IGetUserCartResponse>(`${this.baseUrl}/${productId}`);
  }

  clearCart() {
    return this.http.delete(this.baseUrl);
  }
}
