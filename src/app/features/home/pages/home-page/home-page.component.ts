import { Component } from '@angular/core';
import { BreadCrumbsComponent } from '../../../../shared/components/bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-home-page',
  imports: [BreadCrumbsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
