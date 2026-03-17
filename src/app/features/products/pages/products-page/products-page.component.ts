import { Component, inject, OnInit, signal } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interfaces/IAllProductsResponse';
import { CurrencyPipe, ViewportScroller } from '@angular/common';
import { LoadingDataSpinnerComponent } from '../../../../shared/components/loading-data-spinner/loading-data-spinner.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-page',
  imports: [
    PageHeaderComponent,
    RouterLink,
    NgxPaginationModule,
    CurrencyPipe,
    LoadingDataSpinnerComponent,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
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

  // pagination
  limit = 10;
  page = 1;
  totalProducts = 0;

  constructor() {
    this.page = +(this.activatedRoute.snapshot.queryParamMap.get('page') ?? 1);
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    const filter = {
      limit: this.limit,
      page: this.page,
    };
    this.productsService.getAllProducts(filter).subscribe({
      next: (response) => {
        console.log(response);
        this.totalProducts = response.results;

        this.allProducts.set(response.data);
      },
    });
  }

  changePage(page: number): void {
    this.page = page;
    this.getAllProducts();
    this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
    this.router.navigate([], {
      queryParams: {
        page: this.page,
      },
    });
  }
}
