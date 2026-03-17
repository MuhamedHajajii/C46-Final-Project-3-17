import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './features/static/not-found-page/not-found-page.component';
import { UserLayoutComponent } from './core/layouts/user-layout/user-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { GuestLayoutComponent } from './core/layouts/guest-layout/guest-layout.component';
import { Auth_Routes } from './features/auth/auth.routes';
import { Products_Routes } from './features/products/products.routes';
import { Home_Routes } from './features/home/home.routes';
import { Checkout_Routes } from './features/checkout/checkout.routes';
import { Brands_Routes } from './features/brands/brands.routes';
import { Categories_Routes } from './features/categories/categories.routes';

export const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: '',
        children: Home_Routes,
      },
      {
        path: 'products',
        children: Products_Routes,
      },
      {
        path: 'brands',
        children: Brands_Routes,
      },
      {
        path: 'categories',
        children: Categories_Routes,
      },
    ],
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: Auth_Routes,
  },

  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'checkout',
        children: Checkout_Routes,
      },
    ],
  },

  {
    path: 'not-found',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
