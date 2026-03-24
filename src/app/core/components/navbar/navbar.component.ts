import { Icon } from 'flowbite-angular/icon';
import { bars } from 'flowbite-angular/icon/outline/general';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarToggle,
} from 'flowbite-angular/navbar';

import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-navbar',
  imports: [Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarToggle, Icon, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [provideIcons({ bars })],
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly platform = inject(PLATFORM_ID);

  userToken = this.authService.userToken;

  numOfCartItems = this.cartService.numOfCartItems;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform) && this.userToken()) {
      this.getUserCart();
    }
  }

  getUserCart(): void {
    this.cartService.getUserCart().subscribe({
      next: (response) => {
        console.log(response);
        this.numOfCartItems.set(response.numOfCartItems);
      },
      error: (error: HttpErrorResponse) => {},
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
