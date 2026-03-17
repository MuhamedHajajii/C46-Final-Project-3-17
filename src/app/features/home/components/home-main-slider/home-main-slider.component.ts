import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home-main-slider',
  imports: [],
  templateUrl: './home-main-slider.component.html',
  schemas: [NO_ERRORS_SCHEMA],
  styleUrl: './home-main-slider.component.css',
})
export class HomeMainSliderComponent {}
