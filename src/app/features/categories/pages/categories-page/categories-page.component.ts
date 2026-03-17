import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-categories-page',
  imports: [PageHeaderComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent {
  pageTitle = 'All Categories';
  pageDescription = 'Browse our wide range of product categories';
}
