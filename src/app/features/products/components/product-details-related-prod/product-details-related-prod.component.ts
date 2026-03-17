import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CurrencyPipe, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../interfaces/IAllProductsResponse';
import { LoadingDataSpinnerComponent } from '../../../../shared/components/loading-data-spinner/loading-data-spinner.component';

@Component({
  selector: 'app-product-details-related-prod',
  imports: [RouterLink, CurrencyPipe, LoadingDataSpinnerComponent],
  templateUrl: './product-details-related-prod.component.html',
  styleUrl: './product-details-related-prod.component.css',
})
export class ProductDetailsRelatedProdComponent {
  // injected services
  private readonly productsService = inject(ProductsService);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  // signals
  allProducts = signal<IProduct[] | null>(null);

  pageTitle = 'All Products';
  pageDescription = 'Explore our complete product collection';
  breadCrumbs = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productsService.getAllProducts({ limit: 4 }).subscribe({
      next: (response) => {
        this.allProducts.set(response.data);
      },
    });
  }
}
