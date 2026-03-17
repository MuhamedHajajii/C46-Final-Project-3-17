import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-brands-page',
  imports: [PageHeaderComponent],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.css',
})
export class BrandsPageComponent {
  breadCrumbs = [
    {
      name: 'Categories',
      url: ['/test', 'demo'],
    },
  ];
  pageTitle = 'Top Brands';
  pageDescription = 'Shop from your favorite brands';
}
