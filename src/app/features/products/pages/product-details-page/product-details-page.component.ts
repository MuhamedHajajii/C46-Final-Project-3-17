import { Component, inject, OnInit, RESPONSE_INIT, signal } from '@angular/core';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { ProductDetailsInfoComponent } from '../../components/product-details-info/product-details-info.component';
import { ProductDetailsRelatedProdComponent } from '../../components/product-details-related-prod/product-details-related-prod.component';
import { BreadCrumbsComponent } from '../../../../shared/components/bread-crumbs/bread-crumbs.component';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces/IAllProductsResponse';

@Component({
  selector: 'app-product-details-page',
  imports: [
    ProductDetailsComponent,
    ProductDetailsInfoComponent,
    ProductDetailsRelatedProdComponent,
    BreadCrumbsComponent,
  ],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css',
})
export class ProductDetailsPageComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  productId = '';

  productDetails = signal<IProduct | null>(null);

  constructor() {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.activatedRoute.paramMap.subscribe((data) => {
      console.log(data);
      this.productId = data.get('id')!;
      this.getProductDetails();
    });
    this.activatedRoute.queryParamMap.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    this.productsService.getProductById(this.productId).subscribe({
      next: (response) => {
        console.log(response);
        this.productDetails.set(response.data);
      },
    });
  }
}
