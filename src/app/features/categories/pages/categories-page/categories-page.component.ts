import { Component, inject, OnInit, signal } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../interfaces/IGetAllCategories';

@Component({
  selector: 'app-categories-page',
  imports: [PageHeaderComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent implements OnInit {
  // injected services
  private readonly categoriesService = inject(CategoriesService);

  pageTitle = 'All Categories';
  pageDescription = 'Browse our wide range of product categories';

  allCategories = signal<null | ICategory[]>(null);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.allCategories.set(response.data);
      },
    });
  }
}
